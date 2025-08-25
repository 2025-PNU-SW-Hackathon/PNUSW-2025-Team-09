import React from 'react';
import { LoginFormTest } from '@/app_components/LoginFormTest';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { clearAll } from '@/app_components/notice_board_screen/storage';

export default function App() {
  const router = useRouter();

  clearAll();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Hello, Geumjeongyahak!</Text>
      </View>
      <View>
        <LoginFormTest onLoginSuccess={() => {}} />
      </View>
      <View style={styles.textContainer}>
        <TouchableOpacity
          onPress={() => {
            router.push('/sign_up');
          }}
        >
          <Text>회원 가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
