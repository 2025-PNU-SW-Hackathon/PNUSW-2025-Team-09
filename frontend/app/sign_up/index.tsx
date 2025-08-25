import React, { useState } from 'react';
import { View, Button, StyleSheet, StatusBar } from 'react-native';
import { InputField } from '@/app_components/InputField';
import { useRouter } from 'expo-router';
import apiClient from '@/api/clients/publicApi';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const res = await apiClient.post('/users', {
        username,
        email,
        password,
      });
      console.log('회원가입 성공');
      alert(`회원가입 성공!`);
      router.push('/');
    } catch (err) {
      console.error(err);
      alert('회원가입 중 오류 발생');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={{ padding: 24 }}>
        <InputField
          label="이름"
          placeholder="이름을 입력하세요"
          value={username}
          onChangeText={setUsername}
        />
        <InputField
          label="이메일"
          placeholder="이메일을 입력하세요"
          value={email}
          onChangeText={setEmail}
        />
        <InputField
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChangeText={setPassword}
        />
        <InputField
          label="비밀번호 확인"
          placeholder="비밀번호를 한 번 더 입력하세요"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Button title="회원가입" onPress={() => handleSignUp()} />
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
});
