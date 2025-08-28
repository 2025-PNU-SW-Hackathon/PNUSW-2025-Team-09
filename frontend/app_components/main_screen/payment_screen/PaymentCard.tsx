import React, { memo, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Calendar from '@/app_assets/main/class_request/list/calendar.svg';
import Human from '@/app_assets/main/class_request/list/human.svg';
import Cart from '@/app_assets/main/payment/cart.svg';
import { getPaymentResponse } from '@/api/main/Payment/paymentApi';
import { ConfirmActionBar } from '@/app_components/shared/ConfirmActionBar';
import { FilterType } from '../class_request_screen/list_screen/FilterButton';

export type PaymentCardProps = {
  isAdmin: boolean;
  item: getPaymentResponse & { eventId: number };
  filter: FilterType;
  refreshig: boolean;
  setRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
};

const { width: screenWidth } = Dimensions.get('window');

function PaymentCardBase({ isAdmin, item, filter, refreshig, setRefreshing }: PaymentCardProps) {
  const [showActionBar, setShowActionBar] = useState(true);

  const handleAccept = async () => {
    console.log('수락');
    try {
      const paymentData = await AsyncStorage.getItem('paymentRequests');
      const paymentRequests = paymentData ? JSON.parse(paymentData) : [];

      const updatedRequests = paymentRequests.map((request: any) => {
        if (request.id === item.eventId.toString()) {
          return { ...request, status: '승낙' };
        }
        return request;
      });

      await AsyncStorage.setItem('paymentRequests', JSON.stringify(updatedRequests));

      setRefreshing(!refreshig);
      setShowActionBar(false);
    } catch (error) {
      console.error('상태 업데이트 중 오류:', error);
    }
  };

  const handleReject = async () => {
    console.log('거절');
    try {
      const paymentData = await AsyncStorage.getItem('paymentRequests');
      const paymentRequests = paymentData ? JSON.parse(paymentData) : [];

      const updatedRequests = paymentRequests.map((request: any) => {
        if (request.id === item.eventId.toString()) {
          return { ...request, status: '거절' };
        }
        return request;
      });

      await AsyncStorage.setItem('paymentRequests', JSON.stringify(updatedRequests));

      setRefreshing(!refreshig);
      setShowActionBar(false);
    } catch (error) {
      console.error('상태 업데이트 중 오류:', error);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.infoCol}>
        <View style={styles.infoRow}>
          <Calendar style={{ marginRight: screenWidth * 0.02 }} />
          <Text style={styles.desc}>{item.date}</Text>
        </View>
        <View style={styles.infoRow}>
          <Human style={{ marginRight: screenWidth * 0.02 }} />
          <Text style={styles.desc}>{item.teacher}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.infoCol2}>
        <View style={styles.infoCol}>
          <Text style={styles.semiTitle}>장소</Text>
          <Text style={styles.desc}>{item.place}</Text>
        </View>

        <View style={styles.infoCol}>
          <Text style={styles.semiTitle}>사용처</Text>
          <Text style={styles.desc}>{item.payTo}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.infoRow}>
        <Cart style={{ marginRight: screenWidth * 0.02 }} />
        <Text style={styles.desc}>{item.description}</Text>
      </View>
      {showActionBar && filter === '대기' && (
        <ConfirmActionBar isAdmin={isAdmin} onAccept={handleAccept} onReject={handleReject} />
      )}
    </View>
  );
}

export const PaymentCard = memo(PaymentCardBase);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 14,
    marginTop: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: screenWidth * 0.01,
  },
  infoCol: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignContent: 'space-between',
  },
  desc: {
    fontSize: screenWidth * 0.035,
    fontWeight: '500',
    color: '#000',
  },
  divider: {
    height: 1.5,
    backgroundColor: '#F0F0F0',
    marginVertical: screenWidth * 0.035,
  },
  semiTitle: {
    fontSize: screenWidth * 0.025,
    color: '#C8C8C8',
    marginBottom: screenWidth * 0.005,
  },
  infoCol2: {
    flexDirection: 'column',
    paddingVertical: screenWidth * 0.015,
    gap: screenWidth * 0.025,
  },
});
