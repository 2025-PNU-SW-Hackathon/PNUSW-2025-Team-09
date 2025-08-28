import React, { useCallback, useMemo, useState } from 'react';
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
import { SelectButton } from '@/app_components/main_screen/class_request_screen/list_screen/SelectButton';
import {
  FilterButton,
  FilterType,
} from '@/app_components/main_screen/class_request_screen/list_screen/FilterButton';
import { FilterSheet } from '@/app_components/main_screen/class_request_screen/list_screen/FilterSheet';
import GoBack from '@/app_assets/main/goback.svg';
import { router, useFocusEffect } from 'expo-router';
import { getExchangeResponse } from '@/api/main/exchangeApi';
import { getCancelResponse } from '@/api/main/cancelApi';
import { getExchangeMock } from '@/api/main/exchangeMock';
import { getCancelMock } from '@/api/main/cancelMock';
import { ExchangeCard } from '@/app_components/main_screen/class_request_screen/list_screen/ExchangeCard';
import { CancelCard } from '@/app_components/main_screen/class_request_screen/list_screen/CancelCard';
import { AddButton } from '@/app_components/main_screen/class_request_screen/list_screen/AddButton';
import { BottomAppbar } from '@/app_components/shared/BottomAppbar';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type ExchangeItem = getExchangeResponse & { eventId: number; kind: '교환' };
type CancelItem = getCancelResponse & { eventId: number; kind: '결강' };
type ListItem = ExchangeItem | CancelItem;

type LocalExchangeItem = {
  id: string;
  type: 'exchange';
  dateFrom: string;
  timeFrom: string;
  classFrom: string;
  teacherFrom: string;
  dateTo: string;
  timeTo: string;
  classTo: string;
  teacherTo: string;
  description: string;
  status: string;
  createdAt: string;
};

type LocalAbsenceItem = {
  id: string;
  type: 'absence';
  date: string;
  time: string;
  class: string;
  teacher: string;
  description: string;
  status: string;
  createdAt: string;
};

const SVG_SIZE = screenWidth * 0.045;

export default function ClassRequestScreen() {
  const [selection, setSelection] = useState<'교환' | '결강'>('교환');
  const [filter, setFilter] = useState<FilterType>('대기');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<ListItem[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        setLoading(true);
        try {
          if (selection === '교환') {
            const exchangeData = await AsyncStorage.getItem('exchangeRequests');
            const localExchangeItems: LocalExchangeItem[] = exchangeData
              ? JSON.parse(exchangeData)
              : [];

            const map = await getExchangeMock();
            const mockList: ListItem[] = Object.entries(map).flatMap(([id, val]) => {
              const arr = Array.isArray(val) ? val : [val];
              return arr.map((v) => ({ ...v, eventId: Number(id), kind: '교환' as const }));
            });

            const localList: ListItem[] = localExchangeItems.map((item) => ({
              eventId: Number(item.id),
              kind: '교환' as const,
              dateFrom: item.dateFrom,
              timeFrom: item.timeFrom,
              classFrom: item.classFrom,
              teacherFrom: item.teacherFrom,
              dateTo: item.dateTo,
              timeTo: item.timeTo,
              classTo: item.classTo,
              teacherTo: item.teacherTo,
              description: item.description,
              status: item.status as any,
            }));

            setItems([...mockList, ...localList]);
          } else {
            const absenceData = await AsyncStorage.getItem('absenceRequests');
            const localAbsenceItems: LocalAbsenceItem[] = absenceData
              ? JSON.parse(absenceData)
              : [];

            const map = await getCancelMock();
            const mockList: ListItem[] = Object.entries(map).flatMap(([id, arr]) =>
              arr.map((v) => ({ ...v, eventId: Number(id), kind: '결강' as const })),
            );

            const localList: ListItem[] = localAbsenceItems.map((item) => ({
              eventId: Number(item.id),
              kind: '결강' as const,
              date: item.date,
              time: item.time,
              class: item.class,
              teacher: item.teacher,
              description: item.description,
              status: item.status as any,
            }));

            setItems([...mockList, ...localList]);
          }
        } catch (e) {
          console.error(e);
          setItems([]);
        } finally {
          setLoading(false);
        }
      };
      load();
    }, [selection, filter, refreshing, isAdmin]),
  );

  const filtered = useMemo(() => items.filter((i) => i.status === filter), [items, filter]);

  const emptyText =
    selection === '교환' ? '작성된 교환 요청서가 없습니다' : '작성된 결강 요청서가 없습니다';

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F0F0F0" />
        <View style={styles.topRow}>
          <View style={styles.backIcon}>
            <GoBack
              onPress={() => {
                router.push('/main');
              }}
              width={SVG_SIZE}
              height={SVG_SIZE}
              style={{ marginLeft: screenWidth * 0.03 }}
            />
          </View>
          <Text style={styles.title} onPress={() => setIsAdmin(!isAdmin)}>
            {selection} 요청서
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
        <View style={styles.selection}>
          <SelectButton
            label="교환"
            isSelected={selection === '교환'}
            onPress={() => setSelection('교환')}
          />
          <SelectButton
            label="결강"
            isSelected={selection === '결강'}
            onPress={() => setSelection('결강')}
          />
        </View>

        {loading ? (
          <ActivityIndicator style={{ marginTop: 28 }} />
        ) : filtered.length === 0 ? (
          <Text style={styles.emptyText}>{emptyText}</Text>
        ) : (
          <FlatList
            contentContainerStyle={{
              paddingTop: screenWidth * 0.04,
              paddingBottom: screenWidth * 0.2,
            }}
            data={filtered}
            keyExtractor={(item, idx) => `${item.kind}-${item.eventId}-${idx}`}
            renderItem={({ item }) =>
              selection === '교환' ? (
                <ExchangeCard
                  isAdmin={isAdmin}
                  item={item as ExchangeItem}
                  filter={filter}
                  refreshig={refreshing}
                  setRefreshing={setRefreshing}
                />
              ) : (
                <CancelCard
                  isAdmin={isAdmin}
                  item={item as CancelItem}
                  filter={filter}
                  refreshig={refreshing}
                  setRefreshing={setRefreshing}
                />
              )
            }
          />
        )}

        <AddButton
          onPress={() => router.push('/main/class_request/select')}
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
  backIcon: {
    borderWidth: 0,
  },
  emptyText: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: screenWidth * 0.035,
    color: '#999',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: screenWidth * 0.13,
  },
  selection: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  addBtn: {
    position: 'absolute',
    right: screenWidth * 0.05,
    bottom: screenHeight * 0.025,
    zIndex: 999,
  },
});
