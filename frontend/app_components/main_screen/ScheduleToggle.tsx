import React, { useState, useCallback } from 'react';
import { TouchableOpacity, Animated, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface Toggle {
  isMine: boolean;
  setIsMine: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Toggle = ({ isMine, setIsMine }: Toggle) => {
  const translateX = useState(new Animated.Value(isMine ? screenWidth * 0.08 : 0))[0];

  const toggle = useCallback(() => {
    Animated.timing(translateX, {
      toValue: isMine ? 0 : screenWidth * 0.08,
      duration: 200,
      useNativeDriver: true,
    }).start();

    setIsMine(!isMine);
  }, [isMine, setIsMine, translateX]);

  return (
    <TouchableOpacity onPress={toggle} activeOpacity={0.8} style={styles.track}>
      <Animated.View style={[styles.ball, { transform: [{ translateX }] }]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  track: {
    width: screenWidth * 0.16,
    height: screenWidth * 0.08,
    borderRadius: screenWidth * 0.04,
    backgroundColor: '#E6E6E6',
    padding: screenWidth * 0.01,
    justifyContent: 'center',
  },
  ball: {
    width: screenWidth * 0.06,
    height: screenWidth * 0.06,
    borderRadius: screenWidth * 0.03,
    backgroundColor: '#434343',
  },
});
