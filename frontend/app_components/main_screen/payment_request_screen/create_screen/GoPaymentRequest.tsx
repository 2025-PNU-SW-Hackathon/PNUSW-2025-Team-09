import React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import ArrowLeftIcon from '@/app_assets/main/request/arrow_left.svg';

const { width: screenWidth } = Dimensions.get('window');

interface GoPaymentRequestProps {
  onPress?: () => void;
}

export function GoPaymentRequest({ onPress }: GoPaymentRequestProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.backButton}>
      <ArrowLeftIcon style={styles.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    padding: screenWidth * 0.02,
  },
  icon: {
    width: screenWidth * 0.06,
    height: screenWidth * 0.06,
  },
});
