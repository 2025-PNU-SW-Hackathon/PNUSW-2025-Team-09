import React from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface PaymentContentProps {
  title: string;
  formData: {
    place: string;
    usage: string;
    detailedItem: string;
  };
  onFormDataChange: (field: string, value: string) => void;
}

export function PaymentContent({ title, formData, onFormDataChange }: PaymentContentProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>장소</Text>
        <TextInput
          style={styles.inputField}
          placeholder="장소를 입력하세요"
          placeholderTextColor="#999"
          value={formData.place}
          onChangeText={(value) => onFormDataChange('place', value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>사용처</Text>
        <TextInput
          style={styles.inputField}
          placeholder="사용처를 입력하세요"
          placeholderTextColor="#999"
          value={formData.usage}
          onChangeText={(value) => onFormDataChange('usage', value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>상세 물품</Text>
        <TextInput
          style={styles.inputField}
          placeholder="상세 물품을 입력하세요"
          placeholderTextColor="#999"
          value={formData.detailedItem}
          onChangeText={(value) => onFormDataChange('detailedItem', value)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: screenHeight * 0.03,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: screenHeight * 0.02,
  },
  inputGroup: {
    marginBottom: screenHeight * 0.015,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginBottom: screenHeight * 0.008,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: screenWidth * 0.04,
    paddingVertical: screenHeight * 0.02,
    fontSize: 14,
    color: '#000',
    backgroundColor: '#fff',
    height: screenHeight * 0.065,
  },
});
