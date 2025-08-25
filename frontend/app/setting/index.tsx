import { View, StatusBar, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import Person from '@/app_assets/setting_screen/person.svg';
import RightArrow from '@/app_assets/setting_screen/arrow_right.svg';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SVG_SIZE = screenWidth * 0.3;

export default function SettingScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.personIconContainer}>
        <Person width={SVG_SIZE} height={SVG_SIZE} fill={'#F0F0F0'} />
      </View>
      <View style={styles.teacherNameContainer}>
        <Text style={styles.teacherName}>김소영 선생님</Text>
      </View>
      <View style={styles.departmentNameContainer}>
        <Text style={styles.departmentName}>총무 2부 부장</Text>
      </View>
      <TouchableOpacity>
        <View style={styles.box}>
          <Text style={styles.text}>프로필 설정</Text>
          <RightArrow style={{ marginRight: screenWidth * 0.03 }} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.box}>
          <Text style={styles.text}>야학 정보</Text>
          <RightArrow style={{ marginRight: screenWidth * 0.03 }} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.box}>
          <Text style={styles.text}>게시판 활동</Text>
          <RightArrow style={{ marginRight: screenWidth * 0.03 }} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  personIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth * 0.4,
    aspectRatio: 1,
    marginTop: screenHeight * 0.1,
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
  },
  teacherNameContainer: {
    marginTop: screenHeight * 0.04,
  },
  teacherName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
  },
  departmentNameContainer: {
    marginBottom: screenHeight * 0.04,
  },
  departmentName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4F4F4F',
    marginTop: 8,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: screenHeight * 0.01,
    width: screenWidth * 0.84,
    height: screenHeight * 0.08,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    lineHeight: screenHeight * 0.08,
    marginLeft: screenWidth * 0.05,
  },
});
