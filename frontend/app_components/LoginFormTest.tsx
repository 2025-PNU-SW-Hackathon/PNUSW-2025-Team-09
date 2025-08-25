import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { InputField } from './InputField';
import { useRouter } from 'expo-router';
import publicApi from '@/api/clients/publicApi';

interface LoginFormProps {
  onLoginSuccess: (user: any) => void;
}

export const LoginFormTest: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await publicApi.post('/auth/login', { username, password });
      const token = res.data.token;

      publicApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      alert(`${username}님 환영합니다!`);
      router.push('/main');
      onLoginSuccess(username);
    } catch (err) {
      console.error(err);
      alert('로그인 실패');
    }
    // 오류가 발생할 수 있는 상황이 다양함(문법 오류, 네트워크 문제... 등등)
    // 따라서 try-catch 구문으로 오류 처리 구조 작성
    // try 내부 코드가 정상적으로 작동이 잘 되는지를 기준으로 오류 판단
  };

  return (
    <View style={{ padding: 24 }}>
      <InputField
        label="아이디(이메일)"
        placeholder="아이디를 입력하세요"
        value={username}
        onChangeText={setUsername}
      />
      <InputField
        label="비밀번호"
        placeholder="비밀번호를 입력하세요"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="로그인" onPress={() => router.push('/main')} />
    </View>
  );
};
