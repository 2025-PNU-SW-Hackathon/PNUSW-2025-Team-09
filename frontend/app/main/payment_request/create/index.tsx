import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PaymentRequestButton } from '@/app_components/main_screen/payment_request_screen/create_screen/PaymentRequestButton';
import { GoPaymentRequest } from '@/app_components/main_screen/payment_request_screen/create_screen/GoPaymentRequest';
import { PaymentContent } from '@/app_components/main_screen/payment_request_screen/create_screen/PaymentContent';
import { PaymentBasicInfo } from '@/app_components/main_screen/payment_request_screen/create_screen/PaymentBasicInfo';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function PaymentRequestCreate() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    name: '',
    place: '',
    usage: '',
    detailedItem: '',
  });

  const isFormValid = Boolean(
    formData.date &&
      formData.time &&
      formData.name &&
      formData.place &&
      formData.usage &&
      formData.detailedItem,
  );

  const handleSubmit = async () => {
    if (isFormValid) {
      try {
        const paymentData = {
          id: Date.now().toString(),
          type: 'payment',
          date: formData.date,
          time: formData.time,
          teacher: formData.name,
          place: formData.place,
          payTo: formData.usage,
          description: formData.detailedItem,
          status: '대기',
          createdAt: new Date().toISOString(),
        };

        const existingData = await AsyncStorage.getItem('paymentRequests');
        const existingRequests = existingData ? JSON.parse(existingData) : [];
        const updatedRequests = [...existingRequests, paymentData];
        await AsyncStorage.setItem('paymentRequests', JSON.stringify(updatedRequests));

        console.log('결제 요청 저장됨:', paymentData);
        alert('결제 요청이 완료되었습니다.');
        router.back();
      } catch (error) {
        console.error('요청 저장 중 오류:', error);
        alert('요청 저장 중 오류가 발생했습니다.');
      }
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topRow}>
          <GoPaymentRequest onPress={() => router.back()} />
          <Text style={styles.headerTitle}>작성하기</Text>
          <PaymentRequestButton onPress={handleSubmit} isActive={isFormValid} />
        </View>
        <View style={styles.formCard}>
          {/* 기본 정보 섹션 */}
          <PaymentBasicInfo
            title="기본 정보"
            formData={{
              date: formData.date,
              time: formData.time,
              name: formData.name,
            }}
            onFormDataChange={updateFormData}
          />

          {/* 결제 내용 섹션 */}
          <PaymentContent
            title="결제 내용"
            formData={{
              place: formData.place,
              usage: formData.usage,
              detailedItem: formData.detailedItem,
            }}
            onFormDataChange={updateFormData}
          />
        </View>

        {/* 빈 공간을 위한 추가 영역 */}
        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  topRow: {
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: screenWidth * 0.05,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomSpace: {
    height: screenHeight * 0.8,
  },
});
