import { Dimensions, StyleSheet, View } from 'react-native';
import ExchangeIcon from '@/app_assets/main/class_request/list/coloredExchange.svg';
import CancelIcon from '@/app_assets/main/class_request/list/coloredCancel.svg';
import { CreateEntryButton } from '@/app_components/main_screen/class_request_screen/list_screen/CreateEntryButton';
import { router } from 'expo-router';
import GoBack from '@/app_assets/main/goback.svg';
import React from 'react';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function SelectScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.back}>
        <GoBack
          onPress={() => {
            router.push('/main/class_request/list');
          }}
        />
      </View>
      <View style={styles.btn}>
        <CreateEntryButton
          label="교환 요청서"
          Icon={ExchangeIcon}
          onPress={() =>
            router.push({
              pathname: '/main/class_request/create',
              params: { type: 'exchange' },
            })
          }
        />
        <CreateEntryButton
          label="결강 요청서"
          Icon={CancelIcon}
          onPress={() =>
            router.push({
              pathname: '/main/class_request/create',
              params: { type: 'absence' },
            })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  back: {
    position: 'absolute',
    top: screenHeight * 0.05,
    left: screenWidth * 0.08,
  },
  btn: {
    width: screenWidth * 0.7,
    alignItems: 'center',
  },
});
