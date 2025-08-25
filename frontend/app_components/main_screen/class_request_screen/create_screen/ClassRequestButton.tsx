import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface ClassRequestButtonProps {
  onPress: () => void;
  isActive: boolean;
}

export function ClassRequestButton({ onPress, isActive }: ClassRequestButtonProps) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.requestButton} onPress={onPress} disabled={!isActive}>
        {isActive ? (
          <LinearGradient
            colors={['#87C25C', '#5FC077']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientStyle}
          >
            <Text style={styles.requestButtonText}>요청</Text>
          </LinearGradient>
        ) : (
          <View style={styles.disabledGradientStyle}>
            <Text style={styles.requestButtonText}>요청</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    // 절대 위치 제거 - 헤더에서 Flexbox로 배치
  },
  requestButton: {
    borderRadius: screenWidth * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: screenWidth * 0.15,
    minHeight: screenHeight * 0.045,
  },
  gradientStyle: {
    borderRadius: screenWidth * 0.04,
    paddingHorizontal: screenWidth * 0.05,
    paddingVertical: screenHeight * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: screenWidth * 0.15,
    minHeight: screenHeight * 0.045,
  },
  disabledGradientStyle: {
    borderRadius: screenWidth * 0.04,
    paddingHorizontal: screenWidth * 0.05,
    paddingVertical: screenHeight * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: screenWidth * 0.15,
    minHeight: screenHeight * 0.045,
    backgroundColor: '#434343',
  },
  disabledButton: {
    backgroundColor: '#434343',
  },
  requestButtonText: {
    color: '#FFFFFF',
    fontSize: screenWidth * 0.035,
    fontWeight: 'bold',
    fontFamily: 'Pretendard-Bold',
    textAlign: 'center',
  },
  disabledText: {
    color: '#FFFFFF',
  },
});
