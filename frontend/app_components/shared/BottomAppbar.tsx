import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Text } from 'react-native';
import { useRouter } from 'expo-router';
import Calendar from '@/app_assets/bottom_app_bar/calendar.svg';
import NoticeBoard from '@/app_assets/bottom_app_bar/notice_board.svg';
import Home from '@/app_assets/bottom_app_bar/home.svg';
import Settings from '@/app_assets/bottom_app_bar/settings.svg';
import LearningMonitoring from '@/app_assets/bottom_app_bar/learning_monitoring.svg';

type BottomAppbarProps = {
  currentRoute: string;
  setSelectedTab?: React.Dispatch<React.SetStateAction<string>>;
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const BottomAppbar = ({ currentRoute, setSelectedTab }: BottomAppbarProps) => {
  const router = useRouter();

  console.log('BottomAppBar Re-rendering Check:', currentRoute);

  const iconSize = screenWidth * 0.06;

  const tabs = [
    {
      key: 'home',
      icon: (
        <Home
          height={iconSize}
          width={iconSize}
          fill={currentRoute === '/main' ? '#81B55C' : '#8C8C8C'}
        />
      ),
      label: 'Home',
      route: '/main',
    },
    {
      key: 'calendar',
      icon: (
        <Calendar
          height={iconSize}
          width={iconSize}
          fill={currentRoute === '/calendar' ? '#81B55C' : '#8C8C8C'}
        />
      ),
      label: '캘린더',
      route: '/calendar',
    },
    {
      key: 'learning_monitoring',
      icon: (
        <LearningMonitoring
          height={iconSize}
          width={iconSize}
          fill={currentRoute === '/learning_monitoring' ? '#81B55C' : '#8C8C8C'}
        />
      ),
      label: '학습 모니터링',
      route: '/learning_monitoring',
    },
    {
      key: 'notice_board',
      icon: (
        <NoticeBoard
          height={iconSize}
          width={iconSize}
          fill={currentRoute === '/notice_board' ? '#81B55C' : '#8C8C8C'}
        />
      ),
      label: '게시판',
      route: '/notice_board',
    },
    {
      key: 'setting',
      icon: (
        <Settings
          height={iconSize}
          width={iconSize}
          fill={currentRoute === '/setting' ? '#81B55C' : '#8C8C8C'}
        />
      ),
      label: '설정',
      route: '/setting',
    },
  ] as const;

  return (
    <View style={styles.bottomAppBar}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={styles.tabContainer}
          onPress={() => {
            setSelectedTab?.(tab.route);
            router.push(tab.route);
          }}
        >
          {tab.icon}
          <Text
            style={[
              styles.tabLabel,
              {
                color: currentRoute === tab.route ? '#81B55C' : '#8C8C8C',
              },
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomAppBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: screenHeight * 0.12,
    width: screenWidth,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: screenWidth * 0.03,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    // ios 전용
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // 안드로이드 전용
    elevation: 5,
  },
  tabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
    textAlign: 'center',
  },
});
