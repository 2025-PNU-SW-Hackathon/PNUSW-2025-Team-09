import { View, Text, StyleSheet, Dimensions, Vibration } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import RightArrow from '@/app_assets/main/right-arrow.svg';
import Check from '@/app_assets/main/check.svg';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import { ClassIcon } from './ClassIcon';
import { getCurrentUserName } from '@/api/login';
import { getWeeklySchedule } from '@/api/main/weeklyScheduleMock';
import { Schedule } from '@/api/main/weeklyScheduleApi';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const SLIDER_WIDTH = screenWidth * 0.8;
const BALL_WIDTH = screenWidth * 0.12;

interface AttendanceButton {
  onAttendance: boolean;
  setOnAttendance: React.Dispatch<React.SetStateAction<boolean>>;
  showPopup: () => void;
}

export const AttendanceButton = ({
  onAttendance,
  setOnAttendance,
  showPopup,
}: AttendanceButton) => {
  const isCompleted = useSharedValue(false);
  const translateX = useSharedValue(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [todayClass, setTodayClass] = useState<Schedule | null>(null);

  // 오늘의 수업 정보 가져오기
  useEffect(() => {
    const fetchTodayClass = async () => {
      try {
        const today = new Date().getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
        const currentTeacherName = getCurrentUserName();

        const schedules = await getWeeklySchedule(today);
        const myTodayClass = schedules.find(
          (schedule: Schedule) => schedule.teacherName === currentTeacherName,
        );

        setTodayClass(myTodayClass || null);
      } catch (error) {
        console.error('오늘의 수업 정보 가져오기 실패:', error);
      }
    };

    fetchTodayClass();
  }, []);

  const handleUnlock = () => {
    Vibration.vibrate(40);
    console.log('출석 완료!');
  };
  // 아래 함수는 worklet 함수: UI 스레드에서 자체적으로 계산하고 수행하는 함수
  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = Math.min(
        Math.max(0, event.translationX),
        SLIDER_WIDTH - BALL_WIDTH - BALL_WIDTH * 0.2,
      );
      runOnJS(setIsScrolling)(true);
      // runOnJS(): UI 스레드에서 수행 과정 중에, JS 스레드에서 수행해야 할 함수를 지정
    })
    .onEnd(() => {
      if (translateX.value > SLIDER_WIDTH * 0.8) {
        translateX.value = withSpring(SLIDER_WIDTH - BALL_WIDTH - BALL_WIDTH * 0.2, {
          overshootClamping: true,
        });
        isCompleted.value = true;
      } else {
        translateX.value = withSpring(0, {
          overshootClamping: true,
        });
        runOnJS(setIsScrolling)(false);
      }
      console.log('onEnd => ', isCompleted.value);
    })
    .onFinalize(() => {
      console.log('onFinalize => ', isCompleted.value);
      if (isCompleted.value === true) {
        runOnJS(handleUnlock)();
        runOnJS(setOnAttendance)(true);
        runOnJS(showPopup)();
      }
    });

  const ballStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });
  return (
    <View style={styles.attendanceButtonContainer}>
      <View style={styles.attendanceButton}>
        <View style={styles.todayInfo}>
          <View style={{ marginLeft: screenWidth * 0.05 }}>
            <Text style={styles.title}>오늘의 수업</Text>
            <Text style={styles.class}>
              {todayClass
                ? `${todayClass.className} ${todayClass.subject} 수업`
                : '오늘 수업이 없습니다'}
            </Text>
          </View>
          {todayClass && (
            <View style={styles.flower}>
              <ClassIcon
                className={todayClass.className}
                width={screenWidth * 0.18}
                height={screenWidth * 0.18}
              />
            </View>
          )}
        </View>
        {!onAttendance ? (
          todayClass ? (
            <LinearGradient
              colors={['#87C25C', '#5FC077']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.track}
            >
              {!isScrolling && <Text style={styles.description}>밀어서 출석을 완료해주세요</Text>}
              <GestureDetector gesture={gesture}>
                <Animated.View style={[styles.ball, ballStyle]}>
                  <RightArrow width={BALL_WIDTH * 0.8} height={BALL_WIDTH * 0.8} fill={'#FFFFFF'} />
                </Animated.View>
              </GestureDetector>
            </LinearGradient>
          ) : (
            <View style={[styles.track, { backgroundColor: '#9E9E9E' }]}>
              <Text style={styles.description}>출석할 수업이 없습니다</Text>
              <View style={[styles.ball, { transform: [{ translateX: 0 }] }]}>
                <RightArrow width={BALL_WIDTH * 0.8} height={BALL_WIDTH * 0.8} fill={'#FFFFFF'} />
              </View>
            </View>
          )
        ) : (
          <View style={{ ...styles.track, backgroundColor: '#434343' }}>
            <Text style={styles.description}>출석 완료!</Text>
            <View
              style={{
                ...styles.ball,
                backgroundColor: '#FFFFFF',
                marginLeft: SLIDER_WIDTH - BALL_WIDTH - BALL_WIDTH * 0.2,
              }}
            >
              <Check width={BALL_WIDTH * 0.8} height={BALL_WIDTH * 0.8} fill={'#434343'} />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  attendanceButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: screenWidth,
    height: screenHeight * 0.3,
  },
  attendanceButton: {
    position: 'absolute',
    left: screenWidth * 0.05,
    right: screenWidth * 0.05,
    top: screenWidth * 0.05,
    bottom: 0,
    borderRadius: screenWidth * 0.07,
    backgroundColor: '#FFFFFF',
  },
  todayInfo: {
    width: '100%',
    position: 'absolute',
    top: screenHeight * 0.05,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
  },
  class: {
    fontSize: 24,
    fontWeight: '600',
  },
  flower: {
    marginRight: screenWidth * 0.05,
  },
  track: {
    width: SLIDER_WIDTH,
    height: BALL_WIDTH * 1.2,
    position: 'absolute',
    alignSelf: 'center',
    bottom: screenWidth * 0.05,
    backgroundColor: '#e0e0e0',
    borderRadius: 30,
    justifyContent: 'center',
    padding: BALL_WIDTH * 0.1,
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    position: 'absolute',
    alignSelf: 'center',
  },
  ball: {
    width: BALL_WIDTH,
    height: BALL_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: BALL_WIDTH / 2,
    borderWidth: BALL_WIDTH * 0.06,
    borderColor: '#FFFFFF',
  },
});
