import React from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface ClassReasonSectionProps {
  reason: string;
  onReasonChange: (text: string) => void;
  title?: string;
  isExchange?: boolean;
}

export function ClassReasonSection({
  reason,
  onReasonChange,
  title = '교환 사유',
  isExchange = true,
}: ClassReasonSectionProps) {
  const maxLength = 100;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.textAreaContainer}>
        <TextInput
          style={styles.textArea}
          placeholder={isExchange ? '교환 사유를 작성해주세요' : '결강 사유를 작성해주세요'}
          placeholderTextColor="#999"
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          value={reason}
          onChangeText={onReasonChange}
          maxLength={maxLength}
        />
        <Text style={styles.characterCount}>
          {reason.length}/{maxLength}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: screenHeight * 0.05,
  },
  sectionTitle: {
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: screenHeight * 0.015,
    marginTop: screenHeight * 0.01,
    fontFamily: 'Pretendard-Bold',
  },
  textAreaContainer: {
    position: 'relative',
  },
  textArea: {
    borderWidth: 0,
    borderRadius: screenWidth * 0.025,
    padding: screenWidth * 0.035,
    fontSize: screenWidth * 0.035,
    color: '#000000',
    minHeight: screenHeight * 0.15,
    fontFamily: 'Pretendard-Regular',
  },
  characterCount: {
    position: 'absolute',
    bottom: screenHeight * 0.01,
    right: screenWidth * 0.035,
    fontSize: screenWidth * 0.03,
    color: '#999',
    fontFamily: 'Pretendard-Regular',
  },
});
