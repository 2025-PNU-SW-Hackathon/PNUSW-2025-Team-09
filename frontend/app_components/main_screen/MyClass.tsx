import React, { memo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ClassIcon } from './ClassIcon';

type ClassName = '벚꽃반' | '국화반' | '민들레반' | '개나리반' | '장미반' | '해바라기반' | '결강';

interface ClassInfo {
  className?: ClassName;
  subject?: string;
  classTime?: string;
  loading?: boolean;
}

const { width: screenWidth } = Dimensions.get('window');

export const MyClass = memo(({ className, subject, classTime, loading }: ClassInfo) => {
  const getBackgroundColor = (className?: ClassName) => {
    switch (className) {
      case '벚꽃반':
        return 'rgba(234, 170, 185, 0.05)';
      case '민들레반':
        return 'rgba(221, 218, 194, 0.05)';
      case '장미반':
        return 'rgba(218, 124, 124, 0.05)';
      case '국화반':
        return 'rgba(228, 158, 92, 0.05)';
      case '개나리반':
        return 'rgba(243, 221, 133, 0.05)';
      case '해바라기반':
        return 'rgba(145, 121, 108, 0.05)';
      default:
        return 'rgba(255, 255, 255, 0.05)';
    }
  };

  if (loading) {
    return (
      <View style={styles.shadowWrapper}>
        <View
          style={[
            styles.contentWrapper,
            styles.loadingContent,
            { backgroundColor: getBackgroundColor(className) },
          ]}
        >
          <Text style={styles.loadingText}>로딩 중...</Text>
          <Text style={styles.loadingSubText}>잠시만 기다려주세요</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.shadowWrapper}>
      <View style={[styles.contentWrapper, { backgroundColor: getBackgroundColor(className) }]}>
        <ClassIcon className={className} width={screenWidth * 0.16} height={screenWidth * 0.16} />
        <Text style={styles.className}>
          {className} {subject} 수업
        </Text>
        <Text style={styles.classTime}>{classTime}</Text>
      </View>
    </View>
  );
});

MyClass.displayName = 'MyClass';

const styles = StyleSheet.create({
  shadowWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    shadowColor: '#5A5E58',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    backgroundColor: '#FFFFFF',
  },
  contentWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    overflow: 'hidden',
  },
  className: {
    fontSize: screenWidth * 0.05,
    fontWeight: '500',
    marginTop: screenWidth * 0.04,
    color: '#333333',
  },
  classTime: {
    fontSize: screenWidth * 0.04,
    fontWeight: '400',
    marginTop: screenWidth * 0.01,
    color: '#555555',
  },
  loadingContent: {
    alignItems: 'center',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: screenWidth * 0.04,
    color: '#787878',
    fontWeight: '400',
  },
  loadingSubText: {
    fontSize: screenWidth * 0.03,
    color: '#787878',
    marginTop: screenWidth * 0.01,
  },
});
