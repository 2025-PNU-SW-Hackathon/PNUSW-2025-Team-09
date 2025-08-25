import React, { memo } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { ClassIcon } from './ClassIcon';
import DownArrow from '@/app_assets/main/down-arrow.svg';
import UpArrow from '@/app_assets/main/up_arrow.svg';
import { Schedule } from '@/api/main/weeklyScheduleApi';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type ClassName = '벚꽃반' | '국화반' | '민들레반' | '개나리반' | '장미반' | '해바라기반' | '결강';

interface ClassInfoListProps {
  schedules: Schedule[];
  loading: boolean;
  showAll?: boolean;
  onMorePress?: () => void;
}

// 단일 일정 컴포넌트
const ClassInfoItem = memo(
  ({
    className,
    subject,
    classTime,
    isCancelled,
  }: {
    className?: ClassName;
    subject?: string;
    classTime?: string;
    isCancelled?: boolean;
  }) => {
    return (
      <View style={styles.classInfo}>
        <View style={styles.class}>
          <View style={styles.icon}>
            <ClassIcon
              className={isCancelled ? '결강' : className}
              width={screenWidth * 0.06}
              height={screenWidth * 0.06}
            />
          </View>
          <Text style={styles.className}>
            {isCancelled ? '결강' : `${className} ${subject}수업`}
          </Text>
        </View>
        <Text style={styles.classTime}>{classTime}</Text>
      </View>
    );
  },
);

ClassInfoItem.displayName = 'ClassInfoItem';

export const ClassInfoList = memo(
  ({ schedules, loading, showAll = false, onMorePress }: ClassInfoListProps) => {
    if (loading) {
      return (
        <View style={[styles.container, styles.loadingContainer]}>
          <Text style={styles.loadingText}>로딩 중...</Text>
        </View>
      );
    }

    if (schedules.length === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.noScheduleText}>일정이 없습니다.</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {showAll ? (
          <ScrollView
            style={styles.schedulesContainer}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {schedules
              .sort((a, b) => a.startTime.localeCompare(b.startTime))
              .map((schedule) => (
                <ClassInfoItem
                  key={schedule.id}
                  className={schedule.className}
                  subject={schedule.subject}
                  classTime={`${schedule.startTime} ~ ${schedule.endTime}`}
                  isCancelled={schedule.isCancelled}
                />
              ))}
          </ScrollView>
        ) : (
          <View style={styles.schedulesContainer}>
            {schedules
              .slice(0, 3)
              .sort((a, b) => a.startTime.localeCompare(b.startTime))
              .map((schedule) => (
                <ClassInfoItem
                  key={schedule.id}
                  className={schedule.className}
                  subject={schedule.subject}
                  classTime={`${schedule.startTime} ~ ${schedule.endTime}`}
                  isCancelled={schedule.isCancelled}
                />
              ))}
            {/* 2개 미만일 때 빈 공간 추가 */}
            {schedules.length < 2 &&
              Array.from({ length: 2 - schedules.length }).map((_, index) => (
                <View key={`empty-${index}`} style={styles.emptyItem} />
              ))}
          </View>
        )}
        {schedules.length > 2 && (
          <TouchableOpacity style={styles.moreButton} onPress={onMorePress}>
            <Text style={{ fontSize: screenWidth * 0.035, fontWeight: '500' }}>
              {showAll ? '접기' : '더보기'}
            </Text>
            {!showAll && <DownArrow fill={'#000000'} />}
            {showAll && <UpArrow fill={'#000000'} />}
          </TouchableOpacity>
        )}
      </View>
    );
  },
);

ClassInfoList.displayName = 'ClassInfoList';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  schedulesContainer: {
    flex: 1,
    width: '100%',
    maxHeight: '100%',
  },
  scrollContent: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  classInfo: {
    width: '100%',
    height: screenWidth * 0.12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: screenWidth * 0.01,
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
  },
  class: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginLeft: screenWidth * 0.02,
  },
  className: {
    marginLeft: screenWidth * 0.02,
    fontSize: screenWidth * 0.038,
    fontWeight: '500',
  },
  classTime: {
    marginRight: screenWidth * 0.03,
    fontSize: screenWidth * 0.038,
    fontWeight: '400',
    color: '#787878',
  },
  moreButton: {
    width: screenWidth * 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: screenHeight * 0.02,
  },
  noScheduleText: {
    textAlign: 'center',
    fontSize: screenWidth * 0.04,
    color: '#787878',
  },
  emptyItem: {
    width: '100%',
    height: screenWidth * 0.12,
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: screenWidth * 0.04,
    color: '#787878',
  },
  loadingContainer: {
    justifyContent: 'center',
  },
});
