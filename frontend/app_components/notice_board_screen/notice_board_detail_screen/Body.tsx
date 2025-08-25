import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Line } from './Line';
import { Post } from '../storage';

interface Body {
  post?: Post;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const Body = ({ post }: Body) => {
  function formatDate(ts?: number) {
    if (!ts) return;
    const d = new Date(ts);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    return `${yyyy}.${mm}.${dd} ${hh}:${min}`;
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{post?.title}</Text>
      </View>
      <View style={styles.postInfo}>
        <View style={styles.author}>
          <View style={styles.circle} />
          <View style={{ marginLeft: screenWidth * 0.02 }}>
            <Text style={styles.authorText}>김소영 선생님</Text>
          </View>
        </View>
        <Text style={styles.views}>{formatDate(post?.createdAt)} · 조회수 100</Text>
      </View>
      <Line />
      <View style={styles.content}>
        <Text style={styles.contentText}>{post?.content}</Text>
      </View>
      <Line />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: 'auto',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: screenWidth * 0.1,
    paddingRight: screenWidth * 0.1,
    borderTopWidth: 1,
    borderTopColor: '#ADADAD',
  },
  title: {
    width: '100%',
    height: 'auto',
    marginTop: screenHeight * 0.03,
  },
  titleText: {
    fontSize: 22,
    fontWeight: '500',
  },
  postInfo: {
    position: 'relative',
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: screenHeight * 0.02,
    marginBottom: screenHeight * 0.02,
  },
  author: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: screenWidth * 0.06,
    aspectRatio: 1 / 1,
    borderRadius: screenWidth * 0.03,
    backgroundColor: '#E9E9E9',
  },
  authorText: {
    fontSize: 12,
    fontWeight: '500',
  },
  postTime: {
    fontSize: 12,
  },
  views: {
    fontSize: 12,
  },
  content: {
    width: '100%',
    height: 'auto',
    minHeight: screenHeight * 0.2,
    marginTop: screenHeight * 0.03,
  },
  contentText: {
    fontSize: 16,
    fontWeight: '400',
  },
});
