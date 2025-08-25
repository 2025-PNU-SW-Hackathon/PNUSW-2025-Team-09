import {
  View,
  Text,
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { Header } from '@/app_components/main_screen/Header';
import { AttendanceButton } from '@/app_components/main_screen/AttendanceButton';
import { WeeklySchedule } from '@/app_components/main_screen/WeeklySchedule';
import { PaymentRequestButton } from '@/app_components/main_screen/PaymentRequestButton';
import { ClassRequestButton } from '@/app_components/main_screen/ClassRequestButton';
import { useState } from 'react';
import CheckHoleOverlay from '@/app_assets/main/check-hole-overlay.svg';
import { useRouter } from 'expo-router';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function MainScreen() {
  const router = useRouter();
  const today = new Date();
  const day = today.getDay();
  const [selectedDay, setSelectedDay] = useState(day);
  const [onAttendance, setOnAttendance] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const opacity = useState(new Animated.Value(1))[0];

  const showPopup = () => {
    setPopupVisible(true);
    setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1300,
        useNativeDriver: true,
      }).start(() => {
        setPopupVisible(false);
      });
    }, 1000);
    return;
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F1F1F1" />
      {popupVisible && (
        <Animated.View style={[styles.popup, { opacity: opacity }]}>
          <CheckHoleOverlay width={screenWidth * 0.3} height={screenWidth * 0.3} />
          <Text style={styles.popupText}>출석 완료!</Text>
        </Animated.View>
      )}
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
  popup: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  popupText: {
    marginTop: screenHeight * 0.03,
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
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
