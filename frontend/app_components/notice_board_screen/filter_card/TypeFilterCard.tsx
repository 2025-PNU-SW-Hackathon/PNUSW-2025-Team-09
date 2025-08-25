import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
import CheckIcon from '@/app_assets/main/check.svg';

type Props = {
  selected: string;
  onSelect: (id: string) => void;
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const TYPE_LIST = [
  { id: '전체', label: '전체' },
  { id: '회의', label: '회의' },
  { id: '교사 업무', label: '교사 업무' },
];

export const TypeFilterCard = ({ selected, onSelect }: Props) => {
  const renderItem = ({ item }: { item: (typeof TYPE_LIST)[0] }) => {
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
      <FlatList data={TYPE_LIST} renderItem={renderItem} keyExtractor={(item) => item.id} />
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
