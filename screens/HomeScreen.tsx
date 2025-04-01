// HomeScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { resetAuth } from '../features/auth/authSlice'; // resetAuth'u import edin
import { AppDispatch } from '../store'; // AppDispatch'i import edin (gerekliyse)

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

function HomeScreen({ navigation }: HomeScreenProps) {
  const dispatch: AppDispatch = useDispatch(); // useDispatch'i kullanın

  const handleLogout = () => {
    dispatch(resetAuth()); // Redux action'ını dispatch edin
  };

  return (
    <View style={styles.container}>
      <Text>Hoş Geldiniz!</Text>
      <Button
        title="Çıkış Yap"
        onPress={handleLogout} // handleLogout fonksiyonunu çağırın
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
