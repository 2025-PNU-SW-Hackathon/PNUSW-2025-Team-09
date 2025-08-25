import React from 'react';
import Back from '@/app_assets/notice_board_detail_screen/chevron_left.svg';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

interface Header {
  className: string;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SVG_SIZE = screenWidth * 0.1;

export const Header = ({ className }: Header) => {
  return (
    <View style={styles.container}>
      <Back width={SVG_SIZE} height={SVG_SIZE} style={styles.backIcon} />
      <Text style={styles.text}>{className}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: screenWidth,
    height: screenHeight * 0.1,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: screenHeight * 0.02,
  },
  backIcon: {
    position: 'absolute',
    left: screenWidth * 0.05,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
});
