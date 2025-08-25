import { Body } from '@/app_components/notice_board_screen/notice_board_detail_screen/Body';
import { CommentInputBar } from '@/app_components/notice_board_screen/notice_board_detail_screen/CommentInputBar';
import { Comments } from '@/app_components/notice_board_screen/notice_board_detail_screen/Comments';
import { Header } from '@/app_components/notice_board_screen/notice_board_detail_screen/Header';
import { getPosts, Post } from '@/app_components/notice_board_screen/storage';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';

const NoticeBoardDetailScreen = () => {
  const scrollRef = useRef<ScrollView>(null);
  const [isInputClicked, setIsInputClicked] = useState(false);
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    const getData = async () => {
      const posts = await getPosts();
      const targetPost = posts.find((item) => item.id === id);
      setPost(targetPost);
    };
    getData();
  }, [id]);

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
      <CommentInputBar post={post} setIsInputClicked={setIsInputClicked} setPost={setPost} />
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
