import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);

  // Telefon numarasına doğrulama kodu gönder
  const sendVerification = async () => {
    try {
      const confirmationResult = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirmation(confirmationResult);
      setError(null);
    } catch (error) {
      setError('Doğrulama kodu gönderilemedi. Lütfen numaranızı kontrol edin.');
    }
  };

  // Kullanıcı doğrulama kodunu girer
  const confirmCode = async () => {
    try {
      await confirmation.confirm(code);
      console.log('Doğrulama başarılı!');
      setError(null);
    } catch (error) {
      setError('Kod doğrulama hatası. Lütfen kodu kontrol edin.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      {!confirmation ? (
        <>
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Telefon Numaranızı Girin"
            keyboardType="phone-pad"
            style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
          />
          <Button title="Doğrulama Kodu Gönder" onPress={sendVerification} />
        </>
      ) : (
        <>
          <TextInput
            value={code}
            onChangeText={setCode}
            placeholder="Doğrulama Kodunu Girin"
            keyboardType="number-pad"
            style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
          />
          <Button title="Kodu Onayla" onPress={confirmCode} />
        </>
      )}
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
    </View>
  );
};

export default LoginScreen;
