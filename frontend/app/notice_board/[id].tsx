import { Body } from '@/app_components/notice_board_screen/notice_board_detail_screen/Body';
import { CommentInputBar } from '@/app_components/notice_board_screen/notice_board_detail_screen/CommentInputBar';
import { Comments } from '@/app_components/notice_board_screen/notice_board_detail_screen/Comments';
import { Header } from '@/app_components/notice_board_screen/notice_board_detail_screen/Header';
import { useBoardData } from '@/contexts/BoardDataContext';
import { Post } from '@/types/notice_board_screen/post';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';

const NoticeBoardDetailScreen = () => {
  const scrollRef = useRef<ScrollView>(null);
  const [isInputClicked, setIsInputClicked] = useState(false);
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState<Post>();
  const { posts, setPosts } = useBoardData();

  console.log(id);

  useEffect(() => {
    const getData = () => {
      const targetPost = posts.find((item) => item.id === id);
      setPost(targetPost);
    };
    getData();
  }, [id, post, posts]);

  useEffect(() => {
    if (isInputClicked) {
      scrollRef.current?.scrollToEnd();
      setIsInputClicked(false);
    }
  }, [isInputClicked]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header />
      <ScrollView ref={scrollRef}>
        <Body post={post} />
        <Comments post={post} />
      </ScrollView>
      <CommentInputBar
        post={post}
        setPost={setPost}
        setPosts={setPosts}
        setIsInputClicked={setIsInputClicked}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default NoticeBoardDetailScreen;
