import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, Platform } from 'react-native';
import CalendarIcon from '@/app_assets/main/request/icon_calender.svg';
import ClockIcon from '@/app_assets/main/request/icon_clock.svg';
import ClassIcon from '@/app_assets/main/request/icon_class.svg';
import PersonIcon from '@/app_assets/main/request/icon_person.svg';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface ClassFormSectionProps {
  title: string;
  classData: {
    date: string;
    time: string;
    class: string;
    name: string;
  };
  onClassDataChange: (field: string, value: string) => void;
}

export function ClassFormSection({ title, classData, onClassDataChange }: ClassFormSectionProps) {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {/* 날짜 */}
      <View style={styles.inputRow}>
        <View style={styles.iconContainer}>
          <CalendarIcon style={styles.inputIcon} />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="날짜를 선택하세요"
            placeholderTextColor="#999"
            value={classData.date}
            showSoftInputOnFocus={false}
            onPress={() => setShow(true)}
          />
          {show && (
            <RNDateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || date;
                const year = currentDate.getFullYear();
                const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                const day = String(currentDate.getDate()).padStart(2, '0');

                const formattedDay = `${year}.${month}.${day}`;

                onClassDataChange('date', formattedDay);
                setDate(currentDate);
                setShow(false);
              }}
            />
          )}
        </View>
      </View>
      {/* 시간 */}
      <View style={styles.inputRow}>
        <View style={styles.iconContainer}>
          <ClockIcon style={styles.inputIcon} />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="시간을 선택하세요"
            placeholderTextColor="#999"
            value={classData.time}
            onChangeText={(text) => onClassDataChange('time', text)}
          />
        </View>
      </View>
      {/* 수업 */}
      <View style={styles.inputRow}>
        <View style={styles.iconContainer}>
          <ClassIcon style={styles.inputIcon} />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="수업을 선택하세요"
            placeholderTextColor="#999"
            value={classData.class}
            onChangeText={(text) => onClassDataChange('class', text)}
          />
        </View>
      </View>
      {/* 이름 */}
      <View style={styles.inputRow}>
        <View style={styles.iconContainer}>
          <PersonIcon style={styles.inputIcon} />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="이름을 입력하세요"
            placeholderTextColor="#999"
            value={classData.name}
            onChangeText={(text) => onClassDataChange('name', text)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: screenHeight * 0.02,
  },
  sectionTitle: {
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: screenHeight * 0.03,
    marginTop: screenHeight * 0.01,
    fontFamily: 'Pretendard-Bold',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: screenHeight * 0.02,
  },
  iconContainer: {
    width: screenWidth * 0.1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  inputIcon: {
    width: screenWidth * 0.05,
    height: screenWidth * 0.05,
  },
  inputBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: screenWidth * 0.025,
    paddingVertical: screenHeight * 0.015,
    paddingHorizontal: screenWidth * 0.04,
    justifyContent: 'center',
    minHeight: screenHeight * 0.06,
  },
  input: {
    fontSize: screenWidth * 0.035,
    color: '#000000',
    fontFamily: 'Pretendard-Regular',
    backgroundColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});
