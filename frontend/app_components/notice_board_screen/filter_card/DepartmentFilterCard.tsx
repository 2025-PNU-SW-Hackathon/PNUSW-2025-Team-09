import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
import CheckIcon from '@/app_assets/main/check.svg';

type Props = {
  selected: string;
  onSelect: (id: string) => void;
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const DEPARTMENT_LIST = [
  { id: '전체', label: '전체' },
  { id: '교무기획부', label: '교무기획부' },
  { id: '교육연구부', label: '교육연구부' },
  { id: '생활안전부', label: '생활안전부' },
  { id: '총무부 1', label: '총무부 1' },
  { id: '총무부 2', label: '총무부 2' },
];

export const DepartmentFilterCard = ({ selected, onSelect }: Props) => {
  const renderItem = ({ item }: { item: (typeof DEPARTMENT_LIST)[0] }) => {
    const isSelected = selected === item.id;

    return (
      <TouchableOpacity
        style={[styles.item, isSelected && styles.selectedItem]}
        onPress={() => onSelect(item.id)}
      >
        <Text style={styles.label}>{item.label}</Text>
        {isSelected && <CheckIcon width={screenWidth * 0.05} height={screenWidth * 0.05} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={DEPARTMENT_LIST} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', padding: screenWidth * 0.06, borderRadius: 16 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f4f4f4',
    borderRadius: screenWidth * 0.02,
    paddingVertical: screenHeight * 0.015,
    paddingHorizontal: screenWidth * 0.04,
    marginBottom: screenHeight * 0.01,
  },
  selectedItem: { backgroundColor: '#B8E986' },
  label: { fontSize: screenWidth * 0.04 },
});
