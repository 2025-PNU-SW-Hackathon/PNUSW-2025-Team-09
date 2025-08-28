import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import publicApi from '@/api/clients/publicApi';
import { Post } from '@/types/notice_board_screen/post';
import { GetPostsResponse } from '@/types/notice_board_screen/getPostsResponse';
import { useBoardData } from '@/contexts/BoardDataContext';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type Props = {
  selectedTab: '반' | '부';
  filter1: string; // '전체' 포함
  filter2: string; // '전체' 포함
};

export const NoticeList = ({ selectedTab, filter1, filter2 }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState<string | null>(null);
  const { posts, setPosts } = useBoardData();

  useEffect(() => {
    setPosts([]);
    fetchData();
  }, []);

  const fetchData = useCallback(
    async (isRefresh = false) => {
      if (loading) return;
      setLoading(true);
      setError(null);

      try {
        const response = await publicApi.get<GetPostsResponse>('/notice-board/get', {
          params: {
            boardType: selectedTab,
            classType: filter1,
            contentType: filter2,
            limit: 20,
            cursor: cursor,
          },
        });
        console.log('data', response.data);

        const { posts, hasMore: nextHasMore } = response.data;

        if (isRefresh) {
          setPosts(posts);
        } else {
          setPosts((prev) => {
            const ids = new Set(prev.map((p) => p.id));
            const newOnes = posts.filter((p) => !ids.has(p.id));
            return [...prev, ...newOnes];
          });
        }

        setHasMore(nextHasMore);

        if (posts.length > 0) {
          setCursor(posts[posts.length - 1].createdAt.toString());
        }
      } catch (err) {
        console.error('Error loading posts:', err);
        setError('게시글을 불러오는 데 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    },
    [cursor, filter1, filter2, loading, selectedTab, setPosts],
  );

  if (error) {
    return (
      <View style={{ alignItems: 'center', paddingTop: screenHeight * 0.1 }}>
        <Text style={{ color: 'red' }}>에러: {error}</Text>
      </View>
    );
  }

  if (!posts.length) {
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
          <Text style={styles.metaChip}>{item.boardType === '반' ? '반' : '부'}</Text>
          <Text style={styles.metaDot}>·</Text>
          <Text style={styles.metaText}>{item.classType}</Text>
          <Text style={styles.metaDot}>·</Text>
          <Text style={styles.metaText}>{item.contentType}</Text>
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
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: screenHeight * 0.2 }}
      showsVerticalScrollIndicator={false}
      onEndReached={() => {
        if (hasMore && !loading) {
          fetchData(false);
        }
      }}
      onEndReachedThreshold={0.1}
      removeClippedSubviews={false}
      ListFooterComponent={
        loading ? (
          <ActivityIndicator size="large" color="#87C25C" style={{ marginVertical: 16 }} />
        ) : null
      }
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
