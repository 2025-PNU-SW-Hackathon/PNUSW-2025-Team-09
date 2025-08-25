import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SelectButton } from '@/app_components/main_screen/class_request_screen/list_screen/SelectButton';

interface BoardSelectionProps {
  selection: '반 별 게시판' | '부 별 게시판';
  onSelectionChange: (selection: '반 별 게시판' | '부 별 게시판') => void;
}

export const BoardSelection = ({ selection, onSelectionChange }: BoardSelectionProps) => {
  return (
    <View style={styles.selection}>
      <SelectButton
        label="반 별 게시판"
        isSelected={selection === '반 별 게시판'}
        onPress={() => onSelectionChange('반 별 게시판')}
      />
      <SelectButton
        label="부 별 게시판"
        isSelected={selection === '부 별 게시판'}
        onPress={() => onSelectionChange('부 별 게시판')}
      />
      <View
        style={[
          styles.indicator,
          selection === '반 별 게시판' ? styles.leftIndicator : styles.rightIndicator,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  selection: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    width: '50%',
    height: 3,
    backgroundColor: '#81B55C', // 초록색 바
  },
  leftIndicator: {
    left: 0,
  },
  rightIndicator: {
    right: 0,
  },
});
