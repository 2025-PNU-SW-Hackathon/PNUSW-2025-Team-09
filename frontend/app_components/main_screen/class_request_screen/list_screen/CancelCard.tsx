import { getCancelResponse } from '@/api/main/cancelApi';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import React, { memo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Human from '@/app_assets/main/class_request/list/human.svg';
import Desc from '@/app_assets/main/class_request/list/description.svg';
import Calendar from '@/app_assets/main/class_request/list/calendar.svg';
import Class from '@/app_assets/main/class_request/list/class.svg';
import { ConfirmActionBar } from '@/app_components/shared/ConfirmActionBar';

export type CancelCardProps = {
  isAdmin: boolean;
  item: getCancelResponse & { eventId: number };
};

const { width: screenWidth } = Dimensions.get('window');

function CancelCardBase({ isAdmin, item }: CancelCardProps) {
  const [showActionBar, setShowActionBar] = useState(true);

  const handleAccept = async () => {
    console.log('수락');
    try {
      const absenceData = await AsyncStorage.getItem('absenceRequests');
      const absenceRequests = absenceData ? JSON.parse(absenceData) : [];

      const updatedRequests = absenceRequests.map((request: any) => {
        if (request.id === item.eventId.toString()) {
          return { ...request, status: '승낙' };
        }
        return request;
      });

      await AsyncStorage.setItem('absenceRequests', JSON.stringify(updatedRequests));

      setShowActionBar(false);
    } catch (error) {
      console.error('상태 업데이트 중 오류:', error);
    }
  };

  const handleReject = async () => {
    console.log('거절');
    try {
      const absenceData = await AsyncStorage.getItem('absenceRequests');
      const absenceRequests = absenceData ? JSON.parse(absenceData) : [];

      const updatedRequests = absenceRequests.map((request: any) => {
        if (request.id === item.eventId.toString()) {
          return { ...request, status: '거절' };
        }
        return request;
      });

      await AsyncStorage.setItem('absenceRequests', JSON.stringify(updatedRequests));

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
              <Text style={styles.desc}>{item.date}</Text>
            </View>
            <View style={styles.info}>
              <Class />
              <Text style={styles.desc}>{item.class}</Text>
            </View>
            <View style={styles.info}>
              <Human />
              <Text style={styles.desc}>{item.teacher}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.horizontalDivider} />

      <View style={styles.info}>
        <Desc />
        <Text style={styles.desc}>{item.description}</Text>
      </View>

      {showActionBar && (
        <ConfirmActionBar isAdmin={isAdmin} onAccept={handleAccept} onReject={handleReject} />
      )}
    </View>
  );
}

export const CancelCard = memo(CancelCardBase);

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
  horizontalDivider: {
    height: 1.5,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 2,
    marginVertical: 5,
  },
});
