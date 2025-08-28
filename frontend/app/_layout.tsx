import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { View, StyleSheet, BackHandler, Alert, Animated, Text, Dimensions } from 'react-native';
import { BottomAppbar } from '@/app_components/shared/BottomAppbar';
import { BoardParamsProvider } from '@/contexts/BoardParamsContext';
import { usePopup } from '@/hooks/usePopup';
import CheckHoleOverlay from '@/app_assets/main/check-hole-overlay.svg';
import { clearAll } from '@/app_components/notice_board_screen/storage';
import { BoardDataProvider } from '@/contexts/BoardDataContext';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const LayoutRoute = ['/main', '/calendar', '/learning_monitoring', '/notice_board', '/setting'];

export default function Layout() {
  const router = useRouter();
  const segments = useSegments();
  const currentRoute = `/${segments.join('/')}`;
  const isLayoutRoute = LayoutRoute.includes(currentRoute);
  const { popupVisible, hidePopup } = usePopup();
  const opacity = useState(new Animated.Value(1))[0];

  useEffect(() => {
    if (!popupVisible) return;

    opacity.setValue(1);

    setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1300,
        useNativeDriver: true,
      }).start(() => {
        hidePopup();
      });
    }, 1000);
  }, [hidePopup, opacity, popupVisible]);

  // clearAll(): AsyncStorage 초기화 함수(테스트용)

  useEffect(() => {
    const backAction = () => {
      if (currentRoute === '/' || currentRoute === '/main') {
        Alert.alert('앱 종료', '앱을 종료하시겠습니까?', [
          { text: '취소', style: 'cancel' },
          { text: '확인', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      } else if (
        currentRoute === '/calendar' ||
        currentRoute === '/learning_monitoring' ||
        currentRoute === '/notice_board' ||
        currentRoute === '/setting'
      ) {
        router.push('/main');
        return true;
      } else {
        router.back();
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [currentRoute, router]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BoardParamsProvider>
        <BoardDataProvider>
          <View style={styles.container}>
            <Stack screenOptions={{ headerShown: false }} />
            {popupVisible && (
              <Animated.View style={[styles.popup, { opacity: opacity }]}>
                <CheckHoleOverlay width={screenWidth * 0.3} height={screenWidth * 0.3} />
                <Text style={styles.popupText}>출석 완료!</Text>
              </Animated.View>
            )}
            <View style={styles.bottomAppBarContainer}>
              {isLayoutRoute && <BottomAppbar currentRoute={currentRoute} />}
            </View>
          </View>
        </BoardDataProvider>
      </BoardParamsProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  popup: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 100,
  },
  popupText: {
    marginTop: screenHeight * 0.03,
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  bottomAppBarContainer: {
    position: 'absolute',
    bottom: 0,
  },
});
