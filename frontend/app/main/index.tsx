import {
  View,
  Text,
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Header } from '@/app_components/main_screen/Header';
import { AttendanceButton } from '@/app_components/main_screen/AttendanceButton';
import { WeeklySchedule } from '@/app_components/main_screen/WeeklySchedule';
import { PaymentRequestButton } from '@/app_components/main_screen/PaymentRequestButton';
import { ClassRequestButton } from '@/app_components/main_screen/ClassRequestButton';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { usePopup } from '@/hooks/usePopup';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function MainScreen() {
  const router = useRouter();
  const today = new Date();
  const day = today.getDay();
  const [selectedDay, setSelectedDay] = useState(day);
  const [onAttendance, setOnAttendance] = useState(false);
  const { showPopup } = usePopup();

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F1F1F1" />
      <Header />
      <AttendanceButton
        onAttendance={onAttendance}
        setOnAttendance={setOnAttendance}
        showPopup={showPopup}
      />
      <WeeklySchedule selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <View style={styles.panelHeader}>
        <Text style={styles.panelHeaderText}>신청서 작성하기</Text>
      </View>
      <View style={styles.actionPanel}>
        <TouchableOpacity
          onPress={() => {
            router.push('/main/payment_request');
          }}
        >
          <PaymentRequestButton />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push('/main/class_request/list');
          }}
        >
          <ClassRequestButton />
        </TouchableOpacity>
      </View>
      <View style={styles.space} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
  },
  panelHeader: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  panelHeaderText: {
    marginLeft: screenWidth * 0.05,
    marginTop: screenWidth * 0.05,
    fontSize: 20,
    fontWeight: '600',
  },
  actionPanel: {
    width: screenWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  space: {
    width: screenWidth,
    height: screenHeight * 0.3,
  },
});
