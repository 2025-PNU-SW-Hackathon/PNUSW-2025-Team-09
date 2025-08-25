import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { ClassDiaryCard } from './ClassDiaryCard';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const ClassDiaryList = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        snapToInterval={screenHeight * 0.69}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
      >
        <ClassDiaryCard title="오늘의" />
        <ClassDiaryCard title="이전" />
        <ClassDiaryCard title="이전" />
        <ClassDiaryCard title="이전" />
        <ClassDiaryCard title="이전" />
        <View style={styles.space} />
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
  space: {
    width: '100%',
    height: screenHeight * 0.04,
  },
});
