import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const Header = () => {
  const router = useRouter();

  const handleSearch = () => {
    router.push('/notice_board/search');
  };

  return (
    <View style={styles.container}>
      {/* 뒤로가기 */}
      <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
        <Ionicons name="chevron-back" size={screenWidth * 0.06} color="#000" />
      </TouchableOpacity>

      {/* 제목 */}
      <Text style={styles.title}>게시판</Text>

      {/* 검색 */}
      <TouchableOpacity onPress={handleSearch} style={styles.iconButton}>
        <Ionicons name="search" size={screenWidth * 0.05} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: screenHeight * 0.06,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: screenWidth * 0.04,
    height: screenHeight * 0.06,
  },
  iconButton: {
    padding: screenWidth * 0.01,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});
