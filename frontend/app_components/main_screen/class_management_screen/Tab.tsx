import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Tab {
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const Tab = ({ currentTab, setCurrentTab }: Tab) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          currentTab === '출석부' && { borderBottomWidth: 2, borderBottomColor: '#81B55C' },
        ]}
        onPress={() => setCurrentTab('출석부')}
      >
        <Text style={[styles.text, currentTab === '출석부' && { color: '#81B55C' }]}>출석부</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          currentTab === '수업일지' && { borderBottomWidth: 2, borderBottomColor: '#81B55C' },
        ]}
        onPress={() => setCurrentTab('수업일지')}
      >
        <Text style={[styles.text, currentTab === '수업일지' && { color: '#81B55C' }]}>
          수업일지
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: screenWidth,
    height: screenHeight * 0.06,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth * 0.42,
    height: screenHeight * 0.06,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
