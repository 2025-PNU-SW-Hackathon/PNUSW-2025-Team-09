import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { getExchangeResponse } from '@/api/main/exchangeApi';
import React, { memo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Calendar from '@/app_assets/main/class_request/list/calendar.svg';
import Class from '@/app_assets/main/class_request/list/class.svg';

import Human from '@/app_assets/main/class_request/list/human.svg';
import Desc from '@/app_assets/main/class_request/list/description.svg';
import { ConfirmActionBar } from '@/app_components/shared/ConfirmActionBar';
import { FilterType } from './FilterButton';

export type ExchangeCardProps = {
  isAdmin: boolean;
  item: getExchangeResponse & { eventId: number };
  filter: FilterType;
  refreshig: boolean;
  setRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
};

const { width: screenWidth } = Dimensions.get('window');

function ExchangeCardBase({ isAdmin, item, filter, refreshig, setRefreshing }: ExchangeCardProps) {
  const [showActionBar, setShowActionBar] = useState(true);

  const handleAccept = async () => {
    console.log('수락');
    try {
      const exchangeData = await AsyncStorage.getItem('exchangeRequests');
      const exchangeRequests = exchangeData ? JSON.parse(exchangeData) : [];

      const updatedRequests = exchangeRequests.map((request: any) => {
        if (request.id === item.eventId.toString()) {
          return { ...request, status: '승낙' };
        }
        return request;
      });

      await AsyncStorage.setItem('exchangeRequests', JSON.stringify(updatedRequests));

      setRefreshing(!refreshig);
      setShowActionBar(false);
    } catch (error) {
      console.error('상태 업데이트 중 오류:', error);
    }
  };

  const handleReject = async () => {
    console.log('거절');
    try {
      const exchangeData = await AsyncStorage.getItem('exchangeRequests');
      const exchangeRequests = exchangeData ? JSON.parse(exchangeData) : [];

      const updatedRequests = exchangeRequests.map((request: any) => {
        if (request.id === item.eventId.toString()) {
          return { ...request, status: '거절' };
        }
        return request;
      });

      await AsyncStorage.setItem('exchangeRequests', JSON.stringify(updatedRequests));

      setRefreshing(!refreshig);
      setShowActionBar(false);
    } catch (error) {
      console.error('상태 업데이트 중 오류:', error);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.total}>
        <View style={styles.section}>
          <View style={styles.infos}>
            <View style={styles.info}>
              <Calendar />
              <Text style={styles.desc}>{item.dateFrom}</Text>
            </View>
            <View style={styles.info}>
              <Class />
              <Text style={styles.desc}>{item.classFrom}</Text>
            </View>
            <View style={styles.info}>
              <Human />
              <Text style={styles.desc}>{item.teacherFrom}</Text>
            </View>
          </View>
        </View>

        <View style={styles.verticalDivider} />

        <View style={styles.section}>
          <View style={styles.infos}>
            <View style={styles.info}>
              <Calendar />
              <Text style={styles.desc}>{item.dateTo}</Text>
            </View>
            <View style={styles.info}>
              <Class />
              <Text style={styles.desc}>{item.classTo}</Text>
            </View>
            <View style={styles.info}>
              <Human />
              <Text style={styles.desc}>{item.teacherTo}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.horizontalDivider} />

      <View style={styles.info}>
        <Desc />
        <Text style={styles.desc}>{item.description}</Text>
      </View>

      {showActionBar && filter === '대기' && (
        <ConfirmActionBar isAdmin={isAdmin} onAccept={handleAccept} onReject={handleReject} />
      )}
    </View>
  );
}

export const ExchangeCard = memo(ExchangeCardBase);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    borderRadius: 22,
    padding: 14,
    marginTop: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'transparent',
  },
  total: { flexDirection: 'row' },
  section: { flex: 2, marginBottom: 4, flexDirection: 'row' },
  info: { flexDirection: 'row', alignItems: 'center' },
  infos: { flexDirection: 'column', alignContent: 'flex-start' },
  desc: {
    fontSize: screenWidth * 0.03,
    fontWeight: '500',
    color: '#000000',
    paddingBottom: 2,
    paddingLeft: 8,
  },
  verticalDivider: {
    width: 1.5,
    backgroundColor: '#F0F0F0',
    marginVertical: 6,
    marginHorizontal: 6,
  },
  horizontalDivider: {
    height: 1.5,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 2,
    marginVertical: 5,
  },
});
