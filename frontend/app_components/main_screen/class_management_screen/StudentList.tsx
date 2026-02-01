import { View, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { StudentCard } from './StudentCard';
import { AddStudentButton } from './AddStudentButton';
import { StudentAttendanceInfo } from '@/types/main_screen/class_management_screen/StudentList';

interface StudentList {
  list: StudentAttendanceInfo[];
  setStudentList: React.Dispatch<React.SetStateAction<StudentAttendanceInfo[]>>;
  refreshing: boolean;
  setRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
}

const { width: screenWidth } = Dimensions.get('window');

export const StudentList = ({ list, setStudentList, refreshing, setRefreshing }: StudentList) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        {list.map((item, index) => {
          return (
            <TouchableOpacity
              key={`${index}_${item.name}_${item.isPresent}`}
              onPress={() => {
                list[index].isPresent = !item.isPresent;
                setStudentList([...list]);
              }}
              activeOpacity={1}
            >
              <StudentCard name={item.name} isPresent={item.isPresent} />
            </TouchableOpacity>
          );
        })}
        <AddStudentButton list={list} refreshing={refreshing} setIsRefreshing={setRefreshing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: screenWidth,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
