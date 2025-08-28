import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import GoBack from '@/app_assets/main/goback.svg';
import { router } from 'expo-router';
import {
  FilterButton,
  FilterType,
} from '@/app_components/main_screen/class_request_screen/list_screen/FilterButton';
import { FilterSheet } from '@/app_components/main_screen/class_request_screen/list_screen/FilterSheet';
import { AddButton } from '@/app_components/main_screen/class_request_screen/list_screen/AddButton';
import { BottomAppbar } from '@/app_components/shared/BottomAppbar';
import { PaymentCard } from '@/app_components/main_screen/payment_screen/PaymentCard';
import { getPaymentMock } from '@/api/main/Payment/paymentMock';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SVG_SIZE = screenWidth * 0.045;

// AsyncStorage에서 가져올 데이터 타입
type LocalPaymentItem = {
  id: string;
  type: 'payment';
  date: string;
  time: string;
  teacher: string;
  place: string;
  payTo: string;
  description: string;
  status: string;
  createdAt: string;
};

export default function PaymentRequestScreen() {
  const [filter, setFilter] = useState<FilterType>('대기');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const paymentData = await AsyncStorage.getItem('paymentRequests');
      const localPaymentItems: LocalPaymentItem[] = paymentData ? JSON.parse(paymentData) : [];

      const map = await getPaymentMock();
      const mockList = Object.entries(map).flatMap(([id, val]) =>
        (Array.isArray(val) ? val : [val]).map((v) => ({ ...v, eventId: Number(id) })),
      );

      const localList = localPaymentItems.map((item) => ({
        eventId: Number(item.id),
        date: item.date,
        time: item.time,
        teacher: item.teacher,
        place: item.place,
        payTo: item.payTo,
        description: item.description,
        status: item.status,
      }));

      setItems([...mockList, ...localList]);
    } catch (e) {
      console.error(e);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [filter, refreshing, isAdmin]),
  );

  const filtered = useMemo(() => items.filter((i) => i.status === filter), [items, filter]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F0F0F0" />
        <View style={styles.topRow}>
          <GoBack
            onPress={() => router.push('/main')}
            width={SVG_SIZE}
            height={SVG_SIZE}
            style={{ marginLeft: screenWidth * 0.03 }}
          />
          <Text style={styles.title} onPress={() => setIsAdmin(!isAdmin)}>
            결제 요청서
          </Text>
          {isAdmin ? (
            <Text
              style={{
                marginLeft: screenWidth * 0.095,
                marginTop: screenHeight * 0.007,
                marginBottom: screenHeight * 0.007,
                fontSize: 14,
                color: '#666',
              }}
            >
              관리자
            </Text>
          ) : (
            <FilterButton value={filter} onPress={() => setOpen(true)} />
          )}
        </View>

        {loading ? (
          <ActivityIndicator style={{ marginTop: 28 }} />
        ) : filtered.length === 0 ? (
          <Text style={styles.emptyText}>작성된 결제 요청서가 없습니다</Text>
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(item, idx) => `${item.eventId}-${idx}`}
            renderItem={({ item }) => (
              <PaymentCard
                isAdmin={isAdmin}
                item={item}
                filter={filter}
                refreshig={refreshing}
                setRefreshing={setRefreshing}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        )}

        <AddButton
          onPress={() => router.push('/main/payment_request/create')}
          style={styles.addBtn}
        />

        {!isAdmin && (
          <FilterSheet
            visible={open}
            value={filter}
            onClose={() => setOpen(false)}
            onSelect={(v) => setFilter(v)}
          />
        )}
      </View>

      <BottomAppbar currentRoute="/main" setSelectedTab={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    marginTop: screenWidth * 0.14,
    paddingHorizontal: screenWidth * 0.075,
  },
  topRow: {
    paddingBottom: screenWidth * 0.025,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: screenWidth * 0.13,
  },
  emptyText: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: screenWidth * 0.035,
    color: '#999',
  },
  addBtn: {
    position: 'absolute',
    right: screenWidth * 0.05,
    bottom: screenHeight * 0.025,
    zIndex: 999,
  },
});
