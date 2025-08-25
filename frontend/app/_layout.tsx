import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { View, StyleSheet, BackHandler, Alert } from 'react-native';
import { BottomAppbar } from '@/app_components/shared/BottomAppbar';
import { BoardParamsProvider } from '@/contexts/BoardParamsContext';
import { clearAll } from '@/app_components/notice_board_screen/storage';

const LayoutRoute = ['/main', '/calendar', '/learning_monitoring', '/notice_board', '/setting'];

export default function Layout() {
  const router = useRouter();
  const segments = useSegments();
  const currentRoute = `/${segments.join('/')}`;
  const isLayoutRoute = LayoutRoute.includes(currentRoute);

  // clearAll(): AsyncStorage 초기화 함수

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
        <View style={styles.container}>
          <Stack screenOptions={{ headerShown: false }} />
          <View style={styles.bottomAppBarContainer}>
            {isLayoutRoute && <BottomAppbar currentRoute={currentRoute} />}
          </View>
        </View>
      </BoardParamsProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bottomAppBarContainer: {
    position: 'absolute',
    bottom: 0,
  },
});
