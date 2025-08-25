import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Comment } from './Comment';
import { Line } from './Line';
import { Post } from '../storage';

interface Comments {
  post?: Post;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const Comments = ({ post }: Comments) => {
  const comments = post?.comments ?? [];

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>댓글 {comments.length !== 0 && comments.length}</Text>
      </View>
      {comments.map((item) => {
        return (
          <React.Fragment key={item.id}>
            <Comment key={item.id} content={item.content} createdAt={item.createdAt} />
            <Line />
          </React.Fragment>
        );
      })}
      <View style={styles.space} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: screenWidth,
    height: 'auto',
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: screenWidth * 0.1,
    paddingRight: screenWidth * 0.1,
  },
  title: {
    width: '100%',
    height: 'auto',
    marginTop: screenHeight * 0.03,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
  },
  line: {
    width: screenWidth * 0.88,
    borderColor: '#87C25C',
    borderTopWidth: 1,
  },
  space: {
    height: screenHeight * 0.1,
  },
});
