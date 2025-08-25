import { View, StatusBar, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { mockStudentProgress } from './mockData';
import { Card } from '@/app_components/learning_monitoring_screen/Card';
import { Header } from '@/app_components/learning_monitoring_screen/Header';

export default function LearningMonitoringScreen() {
  const studentListData = mockStudentProgress;
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header className={'장미반'} />
      <View style={styles.container}>
        <ScrollView>
          {studentListData.map((item, index) => {
            return (
              <TouchableOpacity key={index} activeOpacity={1}>
                <Card name={item.name} progress={item.progress} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
