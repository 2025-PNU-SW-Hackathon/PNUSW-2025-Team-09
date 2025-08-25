import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  label: string;
  onPress: () => void;
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const ClassFilterButton = ({ label, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.label}>{label}</Text>
      <Ionicons name="chevron-down" size={screenWidth * 0.04} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    borderRadius: screenWidth * 0.05,
    paddingVertical: screenHeight * 0.012,
    paddingHorizontal: screenWidth * 0.038,
  },
  label: {
    fontSize: screenWidth * 0.035,
    color: '#000',
  },
});
