import React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import WriteButtonSvg from '@/app_assets/notice_board_screen/write_button.svg';
import { router } from 'expo-router';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const WriteButton = () => {
  return (
    <TouchableOpacity
      style={styles.fab}
      activeOpacity={0.85}
      onPress={() => router.push('/notice_board/create')}
    >
      <WriteButtonSvg width={screenWidth * 0.14} height={screenWidth * 0.14} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: screenWidth * 0.05,
    bottom: screenHeight * 0.15,
  },
});
