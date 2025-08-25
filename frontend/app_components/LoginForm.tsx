import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { InputField } from './InputField';
import { useRouter } from 'expo-router';
import publicApi from '@/api/clients/publicApi';

interface LoginFormProps {
  onLoginSuccess: (user: any) => void;
}

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await publicApi.get<User[]>('/users');
      const users = res.data;

      const user = users.find((u: any) => u.email == email && u.password == password);

      if (!user) {
        alert('아이디 또는 비밀번호가 올바르지 않습니다.');
        return;
      }

      alert(`${user.username}님 환영합니다!`);
      router.push('/main');
      onLoginSuccess(user);
    } catch (err) {
      console.error(err);
      alert('로그인 중 오류 발생');
    }
  };

  return (
    <View style={{ padding: 24 }}>
      <InputField
        label="아이디(이메일)"
        placeholder="아이디를 입력하세요"
        value={email}
        onChangeText={setEmail}
      />
      <InputField
        label="비밀번호"
        placeholder="비밀번호를 입력하세요"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="로그인" onPress={handleLogin} />
    </View>
  );
};

// *참고*
// fetch 방식:
// const res = await fetch('https://67e694fe6530dbd3111094dc.mockapi.io/api/v1/users');
// const text = await res.text();

// console.log('응답 본문: ', text);
// text: 하나의 긴 문자열

// const users = JSON.parse(text);
// 하나의 긴 문자열 형식으로 온 정보를 객체를 담은 배열 형식으로 변환하여,
// JavaScript에서 활용 가능한 데이터로 생성

// console.log('응답 parsing: ', users);
// users: 객체를 담은 배열
// C/C++, Java에서는 클래스를 선언해야만 그에 따른 객체를 생성할 수 있다.
// 하지만 JavaScript에서는 클래스 선언과 무관하게 독립적인 객체를 만들어 낼 수 있다.
// 따라서 "object(객체)"라는 타입이 따로 존재하는 것
