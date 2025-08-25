import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

type RequestButtonProps = {
  label: string;
  Icon: any;
  onPress: () => void;
};

export function CreateEntryButton({ label, Icon, onPress }: RequestButtonProps) {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={onPress}>
      <Icon width={screenWidth * 0.12} height={screenWidth * 0.12} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: screenWidth * 0.06,
    width: screenWidth * 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: screenWidth * 0.05,
  },
  label: {
    fontSize: screenWidth * 0.04,
    fontWeight: '500',
    marginTop: screenWidth * 0.02,
    color: '#000',
  },
});
