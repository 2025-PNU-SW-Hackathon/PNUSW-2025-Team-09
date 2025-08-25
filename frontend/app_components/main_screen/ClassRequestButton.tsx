import { View, Text, StyleSheet, Dimensions } from 'react-native';
import PaperAndStamp from '@/app_assets/main/paper-stamp.svg';
import RightArrow from '@/app_assets/main/right-arrow.svg';

const { width: screenWidth } = Dimensions.get('window');

export const ClassRequestButton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.exchangeRequestButton}>
        <PaperAndStamp style={styles.icon} />
        <View>
          <Text style={styles.text}>교환/결강</Text>
          <Text style={styles.text}>신청하기</Text>
        </View>
        <RightArrow
          width={screenWidth * 0.08}
          height={screenWidth * 0.08}
          fill={'#383838'}
          style={styles.rightArrow}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: screenWidth * 0.05,
  },
  header: {
    marginTop: screenWidth * 0.05,
  },
  exchangeRequestButton: {
    width: screenWidth * 0.43,
    height: screenWidth * 0.36,
    marginTop: screenWidth * 0.02,
    borderRadius: screenWidth * 0.05,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  icon: {
    marginLeft: screenWidth * 0.05,
    marginBottom: screenWidth * 0.02,
  },
  text: {
    marginLeft: screenWidth * 0.05,
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  rightArrow: {
    position: 'absolute',
    right: screenWidth * 0.05,
    bottom: screenWidth * 0.03,
  },
});
