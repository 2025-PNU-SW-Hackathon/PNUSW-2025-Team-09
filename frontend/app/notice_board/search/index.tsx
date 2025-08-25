import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

import Back from '@/app_assets/notice_board_screen/back.svg';
import Search from '@/app_assets/notice_board_screen/search.svg';
import Delete from '@/app_assets/notice_board_screen/delete.svg';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SearchScreen = () => {
  const router = useRouter();
  const [recentSearches, setRecentSearches] = useState<string[]>(['야학', '야학']);
  const [searchText, setSearchText] = useState('');

  const handleRemove = (index: number) => {
    const updated = [...recentSearches];
    updated.splice(index, 1);
    setRecentSearches(updated);
  };

  const handleSearchSubmit = () => {
    if (searchText.trim() === '') return;

    if (!recentSearches.includes(searchText.trim())) {
      setRecentSearches([searchText.trim(), ...recentSearches]);
    }

    setSearchText('');
  };

  const posts = [
    { id: '1', title: '야학 공지사항' },
    { id: '2', title: '야학 일정 안내' },
    { id: '3', title: '새로운 수업 안내' },
    { id: '4', title: '2025년 예산 발표' },
    { id: '5', title: '야학 오리엔테이션' },
  ];

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Back width={20} height={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <Search width={20} height={20} />
        <TextInput
          style={styles.input}
          placeholder="검색어를 입력해주세요"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearchSubmit}
        />
      </View>

      <Text style={styles.recentTitle}>최근 검색어</Text>
      <FlatList
        data={recentSearches}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.searchItem}>
            <Text style={styles.searchText}>{item}</Text>
            <TouchableOpacity onPress={() => handleRemove(index)}>
              <Delete width={10} height={10} />
            </TouchableOpacity>
          </View>
        )}
      />

      <Text style={styles.recentTitle}>검색 결과</Text>
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.searchItem}>
            <Text style={styles.searchText}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: screenHeight * 0.06,
    paddingHorizontal: screenWidth * 0.05,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: screenHeight * 0.03,
  },
  input: {
    marginLeft: screenWidth * 0.02,
    flex: 1,
    fontSize: screenWidth * 0.04,
    color: '#000',
  },
  iconButton: {
    marginRight: screenWidth * 0.03,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingBottom: screenHeight * 0.02,
  },
  recentTitle: {
    marginTop: screenHeight * 0.02,
    marginBottom: screenHeight * 0.02,
    fontSize: screenWidth * 0.045,
    fontWeight: 'bold',
  },
  searchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: screenHeight * 0.02,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  searchText: {
    fontSize: screenWidth * 0.035,
    color: '#333',
  },
});

export default SearchScreen;
