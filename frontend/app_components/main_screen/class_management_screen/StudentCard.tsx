import { Text, StyleSheet, Dimensions } from 'react-native';
import Check from '@/app_assets/main/class_management/check.svg';
import { StudentAttendanceInfo } from '@/types/main_screen/class_management_screen/StudentList';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SVG_SIZE = screenWidth * 0.1;

export const StudentCard = ({ name, isPresent }: StudentAttendanceInfo) => {
  return (
    <LinearGradient
      colors={isPresent ? ['#87C25C', '#5FC077'] : ['#FFFFFF', '#FFFFFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={[styles.text, isPresent && { color: '#FFFFFF' }]}>{name}</Text>
      <Check
        width={SVG_SIZE}
        height={SVG_SIZE}
        fill={isPresent ? '#FFFFFF' : '#AEAEAE'}
        style={styles.checkIcon}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: screenWidth * 0.85,
    height: screenHeight * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginTop: screenHeight * 0.024,
  },
  text: {
    position: 'absolute',
    left: screenWidth * 0.05,
    fontSize: 21,
    fontWeight: '500',
    color: '#AEAEAE',
  },
  checkIcon: {
    position: 'absolute',
    right: screenWidth * 0.05,
  },
});
