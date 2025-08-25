import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

interface Comment {
  content: string;
  createdAt: Date;
}

const { height: screenHeight } = Dimensions.get('window');

export const Comment = ({ content, createdAt }: Comment) => {
  const date = new Date(createdAt);

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const sec = String(date.getSeconds()).padStart(2, '0');

  const formatted = `${yyyy}.${mm}.${dd} ${hh}:${min}:${sec}`;

  return (
    <View style={styles.container}>
      <View style={styles.userName}>
        <Text style={styles.text}>{Math.random().toString(36).slice(2, 11)}</Text>
      </View>
      <View style={styles.comment}>
        <Text style={styles.text}>{content}</Text>
      </View>
      <View style={styles.footer}>
        <View>
          <Text style={styles.dateText}>{formatted}</Text>
        </View>
        <View>
          <Text style={styles.replyText}>답글쓰기{' >'}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    height: 'auto',
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: screenHeight * 0.02,
    paddingBottom: screenHeight * 0.02,
  },
  userName: {
    width: '100%',
    height: 'auto',
  },
  comment: {
    width: '100%',
    height: 'auto',
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
  },
  footer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#ADADAD',
    flexDirection: 'row',
    marginTop: screenHeight * 0.01,
  },
  dateText: {
    fontSize: 10,
  },
  replyText: {
    fontSize: 14,
  },
});
