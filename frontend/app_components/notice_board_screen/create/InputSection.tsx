/* eslint-disable @typescript-eslint/no-require-imports */
import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface InputSectionProps {
  title: string;
  content: string;
  onTitleChange: (text: string) => void;
  onContentChange: (text: string) => void;
}

export const InputSection = ({
  title,
  content,
  onTitleChange,
  onContentChange,
}: InputSectionProps) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  // 폰트 로딩
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        /*
        'Pretendard-Semibold': require('../../../../assets/fonts/Pretendard-Semibold.otf'),
        'Pretendard-Regular': require('../../../../assets/fonts/Pretendard-Regular.otf'),
        */
      });
      setFontLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="제목을 입력하세요"
        value={title}
        onChangeText={onTitleChange}
        style={styles.titleInput}
        placeholderTextColor="#A4A4A4"
      />
      <View style={styles.divider} />
      <TextInput
        placeholder="내용을 입력하세요"
        value={content}
        onChangeText={onContentChange}
        multiline
        numberOfLines={10}
        textAlignVertical="top"
        style={styles.contentInput}
        placeholderTextColor="#A4A4A4"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: screenHeight * 0.025,
  },
  titleInput: {
    fontSize: screenWidth * 0.05,
    fontWeight: '600',
    color: '#000000ff',
    fontFamily: 'Pretendard-Semibold',
  },
  contentInput: {
    fontSize: screenWidth * 0.035,
    fontWeight: '500',
    color: '#000000ff',
    fontFamily: 'Pretendard-Regular',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
  },
});
