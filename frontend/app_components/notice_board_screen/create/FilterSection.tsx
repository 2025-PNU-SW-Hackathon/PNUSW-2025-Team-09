import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ClassFilterButton } from '@/app_components/notice_board_screen/filter_button/ClassFilterButton';
import { DepartmentFilterButton } from '@/app_components/notice_board_screen/filter_button/DepartmentFilterButton';
import { TypeFilterButton } from '@/app_components/notice_board_screen/filter_button/TypeFilterButton';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface FilterSectionProps {
  selection: '반 별 게시판' | '부 별 게시판';
  filter1: string;
  filter2: string;
  onFilter1Press: () => void;
  onFilter2Press: () => void;
}

export const FilterSection = ({
  selection,
  filter1,
  filter2,
  onFilter1Press,
  onFilter2Press,
}: FilterSectionProps) => {
  return (
    <View style={styles.filterRow}>
      {selection === '반 별 게시판' ? (
        <ClassFilterButton label={filter1} onPress={onFilter1Press} />
      ) : (
        <DepartmentFilterButton label={filter1} onPress={onFilter1Press} />
      )}
      <TypeFilterButton label={filter2} onPress={onFilter2Press} />
    </View>
  );
};

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: screenWidth * 0.01,
    marginVertical: screenHeight * 0.015,
    gap: screenWidth * 0.03,
  },
});
