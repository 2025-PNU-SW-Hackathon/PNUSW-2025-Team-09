import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';

import CheckIcon from '@/app_assets/main/check.svg';
import MenuIcon from '@/app_assets/main/menu.svg';
import CherryBlossoms from '@/app_assets/class/cherry-blossoms.svg';
import Forsythia from '@/app_assets/class/forsythia.svg';
import Dandelion from '@/app_assets/class/dandelion.svg';
import Rose from '@/app_assets/class/rose.svg';
import Sunflower from '@/app_assets/class/sunflower.svg';
import Chrysanthemum from '@/app_assets/class/chrysanthemum.svg';
import Smartphone from '@/app_assets/class/smartphone.svg';
import English from '@/app_assets/class/english.svg';

type Props = {
  selected: string;
  onSelect: (id: string) => void;
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CLASS_LIST = [
  { id: '전체', icon: MenuIcon, label: '전체' },
  { id: '벚꽃반', icon: CherryBlossoms, label: '벚꽃반' },
  { id: '개나리반', icon: Forsythia, label: '개나리반' },
  { id: '민들레반', icon: Dandelion, label: '민들레반' },
  { id: '장미반', icon: Rose, label: '장미반' },
  { id: '해바라기반', icon: Sunflower, label: '해바라기반' },
  { id: '국화반', icon: Chrysanthemum, label: '국화반' },
  { id: '주말 스마트폰반', icon: Smartphone, label: '주말 스마트폰반' },
  { id: '주말 영어반', icon: English, label: '주말 영어반' },
];

export const ClassFilterCard = ({ selected, onSelect }: Props) => {
  const renderItem = ({ item }: { item: typeof CLASS_LIST[0] }) => {
    
    const isSelected = selected === item.id;
    const IconComponent = item.icon;

    return (
      <TouchableOpacity
        style={[styles.item, isSelected && styles.selectedItem]}
        onPress={() => onSelect(item.id)}
      >
        <View style={styles.left}>
          {IconComponent && <IconComponent width={screenWidth * 0.05} height={screenWidth * 0.05} />}

          <Text style={styles.label}>{item.label}</Text>
        </View>
        {isSelected && <CheckIcon width={screenWidth * 0.05} height={screenWidth * 0.05} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={CLASS_LIST} renderItem={renderItem} keyExtractor={(item) => item.id} />
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
  left: { flexDirection: 'row', alignItems: 'center' },
  label: { fontSize: screenWidth * 0.04, marginLeft: screenWidth * 0.02 },
});
