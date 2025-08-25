import { Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import Add from '@/app_assets/main/class_management/add.svg';
import { StudentAttendanceInfo } from '@/types/main_screen/class_management_screen/StudentList';
import { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface AddStudentButton {
  list: StudentAttendanceInfo[];
  setStudentList: React.Dispatch<React.SetStateAction<StudentAttendanceInfo[]>>;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SVG_SIZE = screenWidth * 0.08;

export const AddStudentButton = ({ list, setStudentList }: AddStudentButton) => {
  const [isClicked, setIsClicked] = useState(false);
  const [text, setText] = useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <TouchableOpacity
        style={[styles.container, isClicked && { backgroundColor: '#FFFFFF' }]}
        onPress={() => {
          setIsClicked(true);
        }}
      >
        {isClicked && (
          <TextInput
            autoFocus
            value={text}
            onChangeText={setText}
            style={styles.input}
            returnKeyType="done"
            placeholder="학생 이름"
            onSubmitEditing={() => {
              list.push({ name: `${text}`, isPresent: false });
              setStudentList([...list]);
              setIsClicked(false);
              setText('');
            }}
            onBlur={() => setIsClicked(false)}
          />
        )}
        {!isClicked && (
          <Add width={SVG_SIZE} height={SVG_SIZE} fill={'#87C25C'} style={styles.checkIcon} />
        )}
        {!isClicked && <Text style={styles.text}>추가</Text>}
      </TouchableOpacity>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: screenWidth * 0.85,
    height: screenHeight * 0.08,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    marginTop: screenHeight * 0.024,
    marginBottom: screenHeight * 0.4,
    borderWidth: 1,
    borderColor: '#87C25C',
  },
  input: {
    width: '100%',
    height: '100%',
    fontSize: 21,
    fontWeight: '500',
    paddingLeft: screenWidth * 0.05,
  },
  text: {
    marginLeft: screenWidth * 0.01,
    fontSize: 21,
    fontWeight: '500',
    color: '#87C25C',
  },
  checkIcon: {
    marginLeft: screenWidth * 0.05,
  },
});
