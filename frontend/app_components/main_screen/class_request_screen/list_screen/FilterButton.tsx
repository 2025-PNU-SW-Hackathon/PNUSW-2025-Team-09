import React from 'react';
import { Pressable, Text, StyleSheet, View, Dimensions } from 'react-native';
import Filter from '@/app_assets/main/class_request/list/filter.svg';

export type FilterType = '대기' | '거절' | '승낙';

const { width: screenWidth } = Dimensions.get('window');

export const FILTER_LABELS: Record<FilterType, string> = {
  대기: '대기',
  거절: '거절',
  승낙: '승낙',
};

type Props = {
  value: FilterType;
  onPress: () => void;
};

export function FilterButton({ value, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.iconWrap}>
        <Filter width={15} height={15} />
      </View>
      <Text style={styles.label}>{FILTER_LABELS[value]}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    height: screenWidth * 0.08,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  iconWrap: {
    width: screenWidth * 0.045,
    height: screenWidth * 0.04,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  label: { fontSize: 14, fontWeight: '600', color: '#3a3a3a' },
});
