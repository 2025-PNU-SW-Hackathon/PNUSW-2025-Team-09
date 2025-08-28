import React, { useState } from 'react';
import { Dimensions, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Send from '@/app_assets/notice_board_detail_screen/send.svg';
import { Post } from '@/types/notice_board_screen/post';
import publicApi from '@/api/clients/publicApi';
import axios from 'axios';
import { GetPostsResponse } from '@/types/notice_board_screen/getPostsResponse';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface CommentInputBar {
  post?: Post;
  setIsInputClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setPost: React.Dispatch<React.SetStateAction<Post | undefined>>;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

export const CommentInputBar = ({
  post,
  setIsInputClicked,
  setPost,
  setPosts,
}: CommentInputBar) => {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="댓글을 입력하세요"
        value={text}
        onChangeText={setText}
        onPress={() => setIsInputClicked(true)}
      />
      <TouchableOpacity
        onPress={async () => {
          if (!post) return;
          if (!text.trim()) return;

          try {
            const response = await publicApi.post('/comment/post', {
              authorNickname: 'byunggil',
              postId: post.id,
              parentId: null,
              content: text.trim(),
            });

            console.log('Comment created:', response.data);
          } catch (error) {
            if (axios.isAxiosError(error)) {
              console.error('Axios error:', error.response?.data);
            } else {
              console.error(error);
            }
          }

          try {
            const response = await publicApi.get<GetPostsResponse>('/notice-board/get', {
              params: {
                boardType: post.boardType,
                classType: post.classType,
                contentType: post.contentType,
                limit: 1,
                targetId: post.id,
              },
            });
            console.log('data', response.data);

            const updated = response.data.posts[0];

            setPost(updated);

            setPosts((prev) => {
              if (!prev) return [];
              return prev.map((p) => (p.id === updated.id ? updated : p));
            });
          } catch (err) {
            console.error('Error loading posts:', err);
          }

          setText('');
          setIsInputClicked(true);
        }}
      >
        <Send style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    height: screenHeight * 0.12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: screenHeight * 0.06,
    width: screenWidth * 0.8,
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    paddingLeft: 16,
  },
  icon: {
    marginLeft: 10,
  },
});
