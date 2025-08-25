import { Header } from '@/app_components/main_screen/class_management_screen/Header';
import { StudentList } from '@/app_components/main_screen/class_management_screen/StudentList';
import { Tab } from '@/app_components/main_screen/class_management_screen/Tab';
import { StudentAttendanceInfo } from '@/types/main_screen/class_management_screen/StudentList';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { mockStudentAttendance } from './mockData';
import { ClassDiaryList } from '@/app_components/main_screen/class_management_screen/ClassDiaryList';

export default function SettingScreen() {
  const { className } = useLocalSearchParams<{ className: string }>();
  const [currentTab, setCurrentTab] = useState('출석부');
  const [studentList, setStudentList] = useState<StudentAttendanceInfo[]>(mockStudentAttendance);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header className={className} />
      <Tab currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {currentTab === '출석부' && (
        <StudentList list={studentList} setStudentList={setStudentList} />
      )}
      {currentTab === '수업일지' && <ClassDiaryList />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
