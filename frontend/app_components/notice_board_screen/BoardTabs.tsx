import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

type Props = {
  selectedTab: '반' | '부';
  setSelectedTab: (tab: '반' | '부') => void;
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const BoardTabs = ({ selectedTab, setSelectedTab }: Props) => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tabButton, selectedTab === '반' && styles.activeTab]}
        onPress={() => setSelectedTab('반')}
      >
        <Text style={styles.tabText}>반 별 게시판</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, selectedTab === '부' && styles.activeTab]}
        onPress={() => setSelectedTab('부')}
      >
        <Text style={[styles.tabText, selectedTab !== '부' && styles.inactiveText]}>
          부 별 게시판
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    marginTop: screenHeight * 0.025,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: screenHeight * 0.01,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#66BB6A',
  },
  tabText: {
    fontSize: screenWidth * 0.04,
    fontWeight: '600',
  },
  inactiveText: {
    color: '#aaa',
  },
});
