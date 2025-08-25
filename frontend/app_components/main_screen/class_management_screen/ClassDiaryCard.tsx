import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  TextInput,
  Platform,
} from 'react-native';
import Calendar from '@/app_assets/main/class_management/calendar.svg';
import Person from '@/app_assets/main/class_management/person.svg';
import { useRef, useState } from 'react';
import RNDateTimePicker from '@react-native-community/datetimepicker';

interface ClassDiaryCard {
  title: string;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const ClassDiaryCard = ({ title }: ClassDiaryCard) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const inputRef = useRef<TextInput>(null);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const formattedDay = `${year}.${month}.${day}`;

  return (
    <View style={[styles.container, title !== '오늘의' && styles.previous]}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{title} 수업 일지</Text>
      </View>
      <View style={styles.inputField}>
        <Calendar />
        <Text style={styles.dateText}>{formattedDay}</Text>
        <TouchableOpacity onPress={() => setShow(true)}>
          <Text style={{ color: '#87C25C' }}>수정</Text>
        </TouchableOpacity>
        {show && (
          <RNDateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || date;
              setShow(false);
              setDate(currentDate);
            }}
          />
        )}
      </View>
      <View style={styles.inputField}>
        <Person />
        <TextInput
          ref={inputRef}
          style={styles.nameTextInput}
          value={name}
          onChangeText={setName}
          placeholder="이름"
          onSubmitEditing={() => setName('')}
        />
        <TouchableOpacity onPress={() => inputRef.current?.focus()}>
          <Text style={{ color: '#87C25C' }}>수정</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line} />
      <TextInput
        style={styles.diaryTextInput}
        multiline={true}
        placeholder="오늘의 수업 내용을 작성해 주세요."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: screenWidth * 0.84,
    height: screenHeight * 0.65,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 16,
    marginTop: screenHeight * 0.04,
    backgroundColor: '#FFFFFF',
  },
  previous: {
    borderWidth: 1,
    borderColor: '#87C25C',
    backgroundColor: '#F0F0F0',
  },
  title: {
    width: '100%',
    height: screenHeight * 0.09,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
  },
  inputField: {
    flexDirection: 'row',
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    width: screenWidth * 0.5,
    marginLeft: screenWidth * 0.02,
    marginRight: screenWidth * 0.02,
    fontWeight: '500',
    paddingLeft: screenWidth * 0.01,
  },
  nameTextInput: {
    width: screenWidth * 0.5,
    marginLeft: screenWidth * 0.02,
    marginRight: screenWidth * 0.02,
    fontWeight: '500',
  },
  line: {
    width: '80%',
    marginTop: screenHeight * 0.01,
    marginBottom: screenHeight * 0.01,
    borderTopWidth: 2,
    borderTopColor: '#F0F0F0',
  },
  diaryTextInput: {
    flex: 1,
    width: '80%',
    textAlignVertical: 'top',
    fontWeight: '500',
  },
});
