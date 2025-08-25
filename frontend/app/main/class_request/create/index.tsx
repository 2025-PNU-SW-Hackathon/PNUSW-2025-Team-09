import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ClassFormSection } from '@/app_components/main_screen/class_request_screen/create_screen/ClassFormSection';
import { GoClassRequest } from '@/app_components/main_screen/class_request_screen/create_screen/GoClassRequest';
import { ClassReasonSection } from '@/app_components/main_screen/class_request_screen/create_screen/ClassReasonSection';
import { ClassRequestButton } from '@/app_components/main_screen/class_request_screen/create_screen/ClassRequestButton';

export default function ClassRequestCreateScreen() {
  const router = useRouter();
  const { type } = useLocalSearchParams<{ type: string }>();
  const isExchange = type === 'exchange';
  const isAbsence = type === 'absence';

  const [myClass, setMyClass] = useState({
    date: '',
    time: '',
    class: '',
    name: '',
  });
  const [opponentClass, setOpponentClass] = useState({
    date: '',
    time: '',
    class: '',
    name: '',
  });
  const [reason, setReason] = useState('');

  const handleMyClassChange = (field: string, value: string) => {
    setMyClass({ ...myClass, [field]: value });
  };

  const handleOpponentClassChange = (field: string, value: string) => {
    setOpponentClass({ ...opponentClass, [field]: value });
  };

  const handleRequest = async () => {
    try {
      if (isExchange) {
        const exchangeData = {
          id: Date.now().toString(), // 고유 ID
          type: 'exchange',
          dateFrom: myClass.date,
          timeFrom: myClass.time,
          classFrom: myClass.class,
          teacherFrom: myClass.name,
          dateTo: opponentClass.date,
          timeTo: opponentClass.time,
          classTo: opponentClass.class,
          teacherTo: opponentClass.name,
          description: reason,
          status: '대기',
          createdAt: new Date().toISOString(),
        };

        const existingData = await AsyncStorage.getItem('exchangeRequests');
        const existingRequests = existingData ? JSON.parse(existingData) : [];

        const updatedRequests = [...existingRequests, exchangeData];

        await AsyncStorage.setItem('exchangeRequests', JSON.stringify(updatedRequests));

        console.log('교환 요청 저장됨:', exchangeData);
        alert('교환 요청이 완료되었습니다.');
        router.back();
      } else if (isAbsence) {
        const absenceData = {
          id: Date.now().toString(), // 고유 ID
          type: 'absence',
          date: myClass.date,
          time: myClass.time,
          class: myClass.class,
          teacher: myClass.name,
          description: reason,
          status: '대기',
          createdAt: new Date().toISOString(),
        };

        const existingData = await AsyncStorage.getItem('absenceRequests');
        const existingRequests = existingData ? JSON.parse(existingData) : [];

        const updatedRequests = [...existingRequests, absenceData];

        await AsyncStorage.setItem('absenceRequests', JSON.stringify(updatedRequests));

        console.log('결강 요청 저장됨:', absenceData);
        alert('결강 요청이 완료되었습니다.');
        router.back();
      }
    } catch (error) {
      console.error('요청 저장 중 오류:', error);
      alert('요청 저장 중 오류가 발생했습니다.');
    }
  };

  // 모든 필드가 입력되었는지 확인
  const isAllFieldsFilled = () => {
    const myClassFilled = Object.values(myClass).every((value) => value.trim() !== '');
    const reasonFilled = reason.trim() !== '';

    if (isExchange) {
      const opponentClassFilled = Object.values(opponentClass).every(
        (value) => value.trim() !== '',
      );
      return myClassFilled && opponentClassFilled && reasonFilled;
    } else if (isAbsence) {
      return myClassFilled && reasonFilled;
    }
    return false;
  };

  const getHeaderTitle = () => {
    return '작성하기';
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerCard}>
          <GoClassRequest onPress={() => router.back()} />
          <Text style={styles.headerTitle}>{getHeaderTitle()}</Text>
          <ClassRequestButton onPress={handleRequest} isActive={isAllFieldsFilled()} />
        </View>

        {/* Main Form Card */}
        <View style={styles.formCard}>
          {/* 수업 섹션 */}
          <View style={styles.sectionContainer}>
            <ClassFormSection
              title={isExchange ? '나의 수업' : '요청할 수업'}
              classData={myClass}
              onClassDataChange={handleMyClassChange}
            />
          </View>

          {/* 상대방의 수업 섹션 (교환 요청서에만 표시) */}
          {isExchange && (
            <View style={styles.sectionContainer}>
              <ClassFormSection
                title="상대방의 수업"
                classData={opponentClass}
                onClassDataChange={handleOpponentClassChange}
              />
            </View>
          )}

          {/* 사유 섹션 */}
          <View style={styles.sectionContainer}>
            <ClassReasonSection
              reason={reason}
              onReasonChange={setReason}
              title={isExchange ? '교환 사유' : '결강 사유'}
              isExchange={isExchange}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'transparent',
    marginHorizontal: 20,
    marginTop: 10,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Pretendard-Bold',
    textAlign: 'center',
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingBottom: 100, // 하단 네비게이션 바 공간 확보
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 0,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 3,
  },
  sectionContainer: {
    paddingHorizontal: 24,
    paddingVertical: 6,
    marginTop: 2,
  },
});
