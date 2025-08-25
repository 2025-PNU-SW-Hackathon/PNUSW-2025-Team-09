import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface DayOfWeek {
  day: string;
  backgroundColor: string;
  color: string;
}

export const DayOfWeek = ({ day, backgroundColor, color }: DayOfWeek) => {
  return (
    <View style={[styles.daysOfWeek, { backgroundColor }]}>
      <Text style={{ fontWeight: '500', color: color }}>{day}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  daysOfWeek: {
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: screenWidth * 0.06,
  },
});
