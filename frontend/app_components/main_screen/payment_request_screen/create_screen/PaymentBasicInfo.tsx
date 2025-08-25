import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, Platform } from 'react-native';
import CalendarIcon from '@/app_assets/main/request/icon_calender.svg';
import ClockIcon from '@/app_assets/main/request/icon_clock.svg';
import PersonIcon from '@/app_assets/main/request/icon_person.svg';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface PaymentBasicInfoProps {
  title: string;
  formData: {
    date: string;
    time: string;
    name: string;
  };
  onFormDataChange: (field: string, value: string) => void;
}

export function PaymentBasicInfo({ title, formData, onFormDataChange }: PaymentBasicInfoProps) {
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
            value={formData.date}
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

                onFormDataChange('date', formattedDay);
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
            value={formData.time}
            onChangeText={(text) => onFormDataChange('time', text)}
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
            value={formData.name}
            onChangeText={(text) => onFormDataChange('name', text)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: screenHeight * 0.03,
  },
  sectionTitle: {
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: screenHeight * 0.04,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: screenHeight * 0.025,
  },
  iconContainer: {
    width: screenWidth * 0.05,
    height: screenWidth * 0.05,
    marginRight: screenWidth * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputIcon: {
    width: screenWidth * 0.16,
    height: screenWidth * 0.16,
  },
  inputBox: {
    width: screenWidth * 0.7,
    height: screenHeight * 0.065,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: screenWidth * 0.025,
    paddingHorizontal: screenWidth * 0.04,
    paddingVertical: screenHeight * 0.015,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  input: {
    fontSize: screenWidth * 0.035,
    color: '#000',
    padding: 0,
    margin: 0,
  },
});
