import React from 'react';
import Back from '@/app_assets/notice_board_detail_screen/chevron_left.svg';
import { Dimensions, StyleSheet, View } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SVG_SIZE = screenWidth * 0.1;

export const Header = () => {
  return (
    <View style={styles.container}>
      <Back width={SVG_SIZE} height={SVG_SIZE} style={styles.backIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: screenWidth,
    height: screenHeight * 0.06,
    marginTop: screenHeight * 0.06,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    position: 'absolute',
    left: screenWidth * 0.05,
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
  },
});
