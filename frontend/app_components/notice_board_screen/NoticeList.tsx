import React, { useCallback, useState } from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { getPostsBy, type Post } from '@/app_components/notice_board_screen/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type Props = {
  selectedTab: '반' | '부';
  filter1: string; // '전체' 포함
  filter2: string; // '전체' 포함
};

export const NoticeList = ({ selectedTab, filter1, filter2 }: Props) => {
  const router = useRouter();
  const [items, setItems] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const posts = await AsyncStorage.getItem('@notice_posts_v1'); // AsyncStorage에서 게시글 가져오기
      console.log('Stored Posts:', JSON.parse(posts || '[]'));

      const list = await getPostsBy(selectedTab, filter1, filter2); // 필터 조건에 맞는 게시글 불러오기
      setItems(list); // 게시글 목록 업데이트
    } catch (err) {
      console.error('Error loading posts:', err);
      setError('게시글을 불러오는 데 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, [selectedTab, filter1, filter2]);

  // 화면에 들어올 때 + 필터 바뀔 때마다 새로 불러오기
  useFocusEffect(
    useCallback(() => {
      fetchData(); // 데이터 새로 고침
    }, [fetchData]),
  );

  if (loading) {
    return (
      <View style={{ alignItems: 'center', paddingTop: screenHeight * 0.1 }}>
        <Text>로딩 중...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ alignItems: 'center', paddingTop: screenHeight * 0.1 }}>
        <Text style={{ color: 'red' }}>에러: {error}</Text>
      </View>
    );
  }

  if (!items.length) {
    return (
      <View style={{ alignItems: 'center', paddingTop: screenHeight * 0.1 }}>
        <Text>게시글이 없습니다.</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Post }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => router.push({ pathname: '/notice_board/[id]', params: { id: item.id } })}
    >
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.content} numberOfLines={2}>
        {item.content}
      </Text>

      <View style={styles.metaRow}>
        <View style={styles.metaLeft}>
          <Text style={styles.metaChip}>{item.selection === '반 별 게시판' ? '반' : '부'}</Text>
          <Text style={styles.metaDot}>·</Text>
          <Text style={styles.metaText}>{item.filter1}</Text>
          <Text style={styles.metaDot}>·</Text>
          <Text style={styles.metaText}>{item.filter2}</Text>
        </View>
        <View style={styles.metaRight}>
          <Ionicons name="time-outline" size={screenWidth * 0.035} color="#B7B7B7" />
          <Text style={[styles.metaText, { marginLeft: screenWidth * 0.01 }]}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: screenHeight * 0.2 }}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: screenWidth * 0.03,
    paddingHorizontal: screenWidth * 0.04,
    paddingVertical: screenWidth * 0.035,
    marginBottom: screenHeight * 0.02,
    gap: screenWidth * 0.01,
    borderBottomWidth: 0.5,
    borderBottomColor: '#B9B9B9',
  },
  title: {
    fontSize: screenWidth * 0.044,
    fontWeight: '600',
    color: '#222',
  },
  content: {
    fontSize: screenWidth * 0.035,
    color: '#666',
  },
  metaRow: {
    marginTop: screenHeight * 0.006,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaLeft: { flexDirection: 'row', alignItems: 'center' },
  metaChip: { fontSize: screenWidth * 0.031, color: '#4CAF50', fontWeight: '600' },
  metaRight: { flexDirection: 'row', alignItems: 'center' },
  metaText: { fontSize: screenWidth * 0.031, color: '#B7B7B7' },
  metaDot: {
    fontSize: screenWidth * 0.031,
    color: '#B7B7B7',
    marginHorizontal: screenWidth * 0.01,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    paddingTop: screenHeight * 0.2,
    gap: screenWidth * 0.03,
  },
  emptyText: { fontSize: screenWidth * 0.04, color: '#9E9E9E' },
});
