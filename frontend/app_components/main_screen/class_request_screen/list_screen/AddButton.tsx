import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StyleProp,
  ViewStyle,
  TouchableOpacityProps,
} from 'react-native';
import Add from '@/app_assets/main/class_request/list/add.svg';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type AddButtonProps = TouchableOpacityProps & {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export const AddButton = ({ onPress, style, ...rest }: AddButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => {
        onPress();
      }}
      style={[styles.fab, style]}
    >
      <Add width={screenWidth * 0.14} height={screenWidth * 0.14} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: screenWidth * 0.05,
    bottom: screenHeight * 0.08,
    zIndex: 999,
  },
});
