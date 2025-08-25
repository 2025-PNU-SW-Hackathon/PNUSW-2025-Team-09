import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export const Line = () => {
  return <View style={styles.line} />;
};

const styles = StyleSheet.create({
  line: {
    width: screenWidth * 0.88,
    borderColor: '#ADADAD',
    borderTopWidth: 1,
  },
});
