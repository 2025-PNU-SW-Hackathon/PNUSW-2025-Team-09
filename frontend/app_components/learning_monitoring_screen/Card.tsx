import { Text, StyleSheet, Dimensions, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Card {
  name: string;
  progress: number;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const Card = ({ name, progress }: Card) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: screenWidth * 0.75,
          justifyContent: 'center',
          alignItems: 'flex-start',
          marginBottom: screenHeight * 0.01,
        }}
      >
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.progress}>
        <LinearGradient
          colors={['#87C25C', '#5FC077']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.progressBar, { width: screenWidth * (progress / 100) * 0.6 }]}
        />
        <View style={styles.percentage}>
          <Text style={styles.percentageText}>{progress}%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: screenWidth * 0.85,
    height: screenHeight * 0.12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginTop: screenHeight * 0.024,
  },
  name: {
    fontSize: 21,
    fontWeight: '500',
  },
  progress: {
    flexDirection: 'row',
    width: screenWidth * 0.75,
    height: screenHeight * 0.03,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  progressBar: {
    width: 0,
    height: 4,
    borderRadius: 12,
  },
  percentage: {
    position: 'absolute',
    right: screenWidth * 0.02,
  },
  percentageText: {
    fontSize: 16,
    fontWeight: '400',
  },
});
