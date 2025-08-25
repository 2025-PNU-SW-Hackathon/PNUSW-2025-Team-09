import React from 'react';
import { Pressable, Text, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

type SelectBtnProps = {
  label: string;
  isSelected: boolean;
  onPress: () => void;
};

export function SelectButton({ label, isSelected, onPress }: SelectBtnProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        isSelected ? styles.selected : styles.unselected,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.textBase, isSelected ? styles.textSelected : styles.textUnselected]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 6,
    alignItems: 'center',
  },
  selected: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    width: '50%',
    borderBottomWidth: 2,
    borderBottomColor: '#81B55C',
  },
  unselected: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  pressed: {
    opacity: 0.85,
  },
  textBase: {
    fontSize: screenWidth * 0.035,
    fontWeight: '500',
  },
  textSelected: {
    color: '#81B55C',
  },
  textUnselected: {
    color: '#AAAAAA',
  },
});
