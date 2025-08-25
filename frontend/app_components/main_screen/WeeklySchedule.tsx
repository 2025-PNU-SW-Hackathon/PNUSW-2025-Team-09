import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { Toggle } from '@/app_components/main_screen/ScheduleToggle';
import { DayOfWeek } from '@/app_components/main_screen/DayOfWeek';
import { ClassInfoList } from '@/app_components/main_screen/ClassInfoList';
import { MyClass } from './MyClass';
import { useRouter } from 'expo-router';
import { getWeeklySchedule, getAllSchedules } from '@/api/main/weeklyScheduleMock';
import { Schedule } from '@/api/main/weeklyScheduleApi';
import { getCurrentUserName } from '@/api/login';

type WeeklyScheduleProps = {
  selectedDay: number;
  setSelectedDay: React.Dispatch<React.SetStateAction<number>>;
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const WeeklySchedule = ({ selectedDay, setSelectedDay }: WeeklyScheduleProps) => {
  const router = useRouter();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAllSchedules, setShowAllSchedules] = useState(false);

  // 애니메이션 값들
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // 현재 로그인한 선생님 이름
  const currentTeacherName = getCurrentUserName();

  const days = [
    {
      key: 1,
      component: (
        <DayOfWeek
          day={'월'}
          backgroundColor={selectedDay === 1 ? '#87C25C' : '#FFFFFF'}
          color={selectedDay === 1 ? '#FFFFFF' : '#000000'}
        />
      ),
    },
    {
      key: 2,
      component: (
        <DayOfWeek
          day={'화'}
          backgroundColor={selectedDay === 2 ? '#87C25C' : '#FFFFFF'}
          color={selectedDay === 2 ? '#FFFFFF' : '#000000'}
        />
      ),
    },
    {
      key: 3,
      component: (
        <DayOfWeek
          day={'수'}
          backgroundColor={selectedDay === 3 ? '#87C25C' : '#FFFFFF'}
          color={selectedDay === 3 ? '#FFFFFF' : '#000000'}
        />
      ),
    },
    {
      key: 4,
      component: (
        <DayOfWeek
          day={'목'}
          backgroundColor={selectedDay === 4 ? '#87C25C' : '#FFFFFF'}
          color={selectedDay === 4 ? '#FFFFFF' : '#000000'}
        />
      ),
    },
    {
      key: 5,
      component: (
        <DayOfWeek
          day={'금'}
          backgroundColor={selectedDay === 5 ? '#87C25C' : '#FFFFFF'}
          color={selectedDay === 5 ? '#FFFFFF' : '#000000'}
        />
      ),
    },
    {
      key: 6,
      component: (
        <DayOfWeek
          day={'토'}
          backgroundColor={selectedDay === 6 ? '#87C25C' : '#FFFFFF'}
          color={selectedDay === 6 ? '#FFFFFF' : '#000000'}
        />
      ),
    },
    {
      key: 0,
      component: (
        <DayOfWeek
          day={'일'}
          backgroundColor={selectedDay === 0 ? '#87C25C' : '#FFFFFF'}
          color={selectedDay === 0 ? '#FFFFFF' : '#000000'}
        />
      ),
    },
  ];
  const [isMine, setIsMine] = useState(false);

  // 선택된 요일의 일정 가져오기
  useEffect(() => {
    const fetchSchedules = async () => {
      setLoading(true);
      setShowAllSchedules(false); // 요일 변경 시 더보기 상태 초기화
      try {
        if (isMine) {
          const data = await getWeeklySchedule(selectedDay);
          // 나의 일정 모드에서는 현재 선생님의 수업만 필터링
          const mySchedules = data.filter(
            (schedule: Schedule) => schedule.teacherName === currentTeacherName,
          );
          console.log(`선택된 요일: ${selectedDay}, 나의 일정:`, mySchedules);
          setSchedules(mySchedules);
        } else {
          const data = await getAllSchedules();
          // 전체 일정 모드에서도 선택된 요일만 필터링
          const filteredData = data.filter(
            (schedule: Schedule) => schedule.dayOfWeek === selectedDay,
          );
          console.log(`전체 일정에서 선택된 요일 ${selectedDay} 필터링:`, filteredData);
          setSchedules(filteredData);
        }
      } catch (error) {
        console.error('일정 데이터 가져오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [selectedDay, isMine, currentTeacherName]);

  // 토글 전환 애니메이션
  const handleToggle = (value: boolean | ((prevState: boolean) => boolean)) => {
    const newIsMine = typeof value === 'function' ? value(isMine) : value;

    // 로딩 상태 시작
    setLoading(true);

    // 페이드 아웃
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setIsMine(newIsMine);

      // 잠깐 로딩 상태 유지 (300ms)
      setTimeout(() => {
        // 페이드 인
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start(() => {
          setLoading(false);
        });
      }, 300);
    });
  };

  return (
    <View style={styles.weeklyScheduleContainer}>
      <View style={styles.weeklySchedule}>
        <View style={styles.header}>
          <View>
            <Text style={{ fontSize: screenWidth * 0.05, fontWeight: 600 }}>이번주 일정</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                marginRight: screenWidth * 0.02,
                fontSize: screenWidth * 0.035,
                fontWeight: 400,
                color: '#525252',
              }}
            >
              {isMine ? '나의 일정' : '전체 일정'}
            </Text>
            <Toggle isMine={isMine} setIsMine={handleToggle} />
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.daysOfWeekContainer}>
            {days.map((day) => (
              <TouchableOpacity key={day.key} onPress={() => setSelectedDay(day.key)}>
                {day.component}
              </TouchableOpacity>
            ))}
          </View>
          <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
            {isMine ? (
              <View style={styles.classInfoContainer}>
                {loading ? (
                  <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>로딩 중...</Text>
                  </View>
                ) : schedules.length > 0 ? (
                  schedules.map((schedule) => (
                    <TouchableOpacity
                      key={schedule.id}
                      activeOpacity={0.8}
                      style={styles.myClassTouchable}
                      onPress={() =>
                        router.push({
                          pathname: '/main/class_management',
                          params: { className: schedule.className },
                        })
                      }
                    >
                      <MyClass
                        className={schedule.className}
                        subject={schedule.subject}
                        classTime={`${schedule.startTime} ~ ${schedule.endTime}`}
                        loading={loading}
                      />
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text style={styles.noScheduleText}>해당 요일에 일정이 없습니다.</Text>
                )}
              </View>
            ) : (
              <View
                style={[
                  styles.classInfoContainer,
                  showAllSchedules && {
                    height: Math.min(
                      screenHeight * 0.6,
                      schedules.length * screenWidth * 0.15 + screenHeight * 0.1,
                    ),
                  },
                ]}
              >
                <ClassInfoList
                  schedules={schedules}
                  loading={loading}
                  showAll={showAllSchedules}
                  onMorePress={() => setShowAllSchedules(!showAllSchedules)}
                />
              </View>
            )}
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weeklyScheduleContainer: {},
  weeklySchedule: {
    marginLeft: screenWidth * 0.05,
    marginRight: screenWidth * 0.05,
    marginTop: screenWidth * 0.05,
    backgroundColor: '#FFFFFF',
    borderRadius: screenWidth * 0.07,
    padding: screenWidth * 0.05,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  body: {
    marginTop: screenWidth * 0.03,
  },
  daysOfWeekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    marginTop: screenWidth * 0.01,
  },
  classInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight * 0.25,
    marginTop: screenWidth * 0.01,
  },
  noScheduleText: {
    textAlign: 'center',
    fontSize: screenWidth * 0.04,
    color: '#787878',
  },
  expandedContainer: {
    height: screenHeight * 0.35,
  },
  myClassTouchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: screenWidth * 0.04,
    color: '#787878',
    fontWeight: '400',
  },
});
