import React, { useState } from 'react';
import { Dimensions, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Send from '@/app_assets/notice_board_detail_screen/send.svg';
import { addComment, Post } from '../storage';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface CommentInputBar {
  post?: Post;
  setIsInputClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setPost: React.Dispatch<React.SetStateAction<Post | undefined>>;
}

export const CommentInputBar = ({ post, setIsInputClicked, setPost }: CommentInputBar) => {
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

          const newComment = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            content: text.trim(),
            createdAt: new Date(),
          };

          const updatedPost = {
            ...post,
            comments: [...post.comments, newComment],
          };
          setPost(updatedPost);

          await addComment(post.id, text);

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
