// screens/LoginScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  Switch,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
  Button,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { AppDispatch, RootState } from '../store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Stil importları
import globalStyles from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { spacing } from '../styles/spacing';
import { typography } from '../styles/typography';

// RootStackParamList (Projenizdeki gerçek navigasyon yapısına göre güncelleyin)
type RootStackParamList = {
  Login: undefined;
  Home: undefined; // Veya giriş sonrası gidilecek ekranın adı
  // ... diğer ekranlar
};

// LoginScreen Props Tipi
type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

// AsyncStorage Key
const USER_STORAGE_KEY = '@MyApp:userToken'; // Uygulamanıza özel bir key kullanın

// *** StyleSheet Tanımlamaları ***
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.xl,
  },
  title: {
    fontSize: typography.fontSize.h2,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xl,
    color: colors.text,
    textAlign: 'center',
  },
  inputGroup: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
    height: 50,
    zIndex: 1, // Ekledim
  },
  inputFocused: {
    borderColor: colors.primary,
    borderWidth: 1.5,
    shadowColor: Platform.OS === 'ios' ? colors.primary : colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 0,
    shadowRadius: 3,
    elevation: Platform.OS === 'android' ? 4 : 0,
  },
  inputBlurred: {
    borderColor: colors.border,
  },
  countryCode: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.regular,
    color: colors.text,
    marginRight: spacing.sm,
    paddingVertical: spacing.md,
  },
  input: {
    flex: 1,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.regular,
    color: colors.text,
    paddingVertical: spacing.md, // Artırdım
    height: 48, // Ekledim
  },
  rememberMeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: spacing.lg,
    marginTop: spacing.sm,
  },
  rememberMeLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    color: colors.textSecondary,
    marginRight: spacing.md,
  },
  loginButtonContainer: {
    marginTop: spacing.xl,
    width: '100%',
    alignItems: 'center',
  },
  buttonInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    marginLeft: spacing.sm,
  },
});

function LoginScreen({ navigation }: LoginScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  
  // Telefon numarası değiştiğinde çalışacak fonksiyon
  const handlePhoneNumberChange = (text: string) => {
    // Sadece rakamları kabul et
    const numericValue = text.replace(/[^0-9]/g, '');
    setPhoneNumber(numericValue);
  };

  const handleLogin = async () => {
    // Klavyeyi kapatmayı en sona bırakalım
    const cleanedPhoneNumber = phoneNumber.replace(/[^0-9]/g, '');

    // Telefon Numarası Doğrulama
    if (cleanedPhoneNumber.trim() === '') {
      Alert.alert('Hata', 'Lütfen telefon numaranızı girin.');
      return;
    }
    
    // Türkiye formatı varsayımı: 5 ile başlar ve toplam 10 hanedir.
    // Test numarası için özel kontrol eklendi
    if (cleanedPhoneNumber !== '1234567890' && !/^[5][0-9]{9}$/.test(cleanedPhoneNumber)) {
      Alert.alert('Hata', 'Lütfen geçerli bir telefon numarası girin (Örn: 5XXXXXXXXX).');
      return;
    }

    // Şimdi klavyeyi kapatabiliriz
    Keyboard.dismiss();
    setLoading(true);

    try {
      // Redux action'ını dispatch et
      const resultAction = await dispatch(loginUser({ phoneNumber: cleanedPhoneNumber }));

      // Action sonucunu kontrol et (fulfilled durumu)
      if (loginUser.fulfilled.match(resultAction)) {
        const payload = resultAction.payload;

        // Gelen payload'un yapısını kontrol et ve token'ı al
        let tokenToStore: string | null = null;
        if (typeof payload === 'object' && payload !== null && 'token' in payload && typeof payload.token === 'string') {
            tokenToStore = payload.token;
            console.log('Giriş başarılı, token alındı.');
        } else {
            // Eğer API sadece token dönüyorsa veya farklı bir yapıdaysa burayı güncelle
            console.warn('Giriş başarılı ancak payload içinde beklenen "token" bulunamadı veya string değil.', payload);
            // Belki payload'ın kendisi token'dır?
            if (typeof payload === 'string') {
                tokenToStore = payload;
            } else {
                 // Token alınamadıysa veya beklenmedik bir formatta ise
                 console.error('Token alınamadı veya formatı geçersiz.');
                 Alert.alert('Giriş Hatası', 'Sunucudan geçerli oturum bilgisi alınamadı.');
                 setLoading(false);
                 return;
            }
        }

        // Token varsa ve "Beni Hatırla" seçiliyse AsyncStorage'a kaydet
        if (tokenToStore && rememberMe) {
          try {
            await AsyncStorage.setItem(USER_STORAGE_KEY, tokenToStore);
            console.log('Token AsyncStorage\'a kaydedildi.');
          } catch (e) {
            console.error('AsyncStorage token kaydetme hatası:', e);
          }
        } else if (!tokenToStore && rememberMe) {
            console.warn('Token alınamadığı için AsyncStorage\'a kaydedilemedi (Beni Hatırla seçiliydi).');
        } else if (!rememberMe) {
            try {
                await AsyncStorage.removeItem(USER_STORAGE_KEY);
                console.log('Beni Hatırla seçili olmadığı için mevcut token silindi (varsa).');
            } catch (e) {
                console.error('AsyncStorage token silme hatası:', e);
            }
        }

        // Giriş başarılı olduğunda Home ekranına yönlendir
        navigation.replace('Home');

      } else if (loginUser.rejected.match(resultAction)) {
        // Action başarısız oldu (rejected durumu)
        console.error('Giriş Reddedildi:', resultAction.payload || resultAction.error.message);
        Alert.alert(
          'Giriş Başarısız',
          (resultAction.payload as any)?.message || resultAction.error.message || 'Telefon numarası doğrulanamadı veya bir hata oluştu.'
        );
      }
    } catch (error) {
      console.error('Beklenmedik giriş hatası:', error);
      Alert.alert('Hata', 'Giriş işlemi sırasında beklenmedik bir sorun oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="always"
          scrollEnabled={true}
        >
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Giriş Yap</Text>

            <View style={styles.inputGroup}>
              <View
                style={[
                  styles.phoneInputContainer,
                  isInputFocused ? styles.inputFocused : styles.inputBlurred,
                ]}
              >
                <Text style={styles.countryCode}>+90</Text>
                <TextInput
                  style={styles.input}
                  placeholder="5XX XXX XX XX"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="number-pad"
                  value={phoneNumber}
                  onChangeText={handlePhoneNumberChange}
                  maxLength={10}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                  editable={true}
                  autoFocus={false}
                />
              </View>
            </View>

            <View style={styles.rememberMeContainer}>
              <Text style={styles.rememberMeLabel}>Beni Hatırla</Text>
              <Switch
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={rememberMe ? colors.white : colors.white}
                ios_backgroundColor={colors.border}
                onValueChange={setRememberMe}
                value={rememberMe}
              />
            </View>

            <View style={styles.loginButtonContainer}>
              <Button
                title={loading ? "" : "Giriş Yap"}
                onPress={handleLogin}
                disabled={loading}
                color={colors.primary}
              />
              {loading && (
                <ActivityIndicator
                  style={StyleSheet.absoluteFill}
                  color={colors.white}
                  size="small"
                />
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

export default LoginScreen;