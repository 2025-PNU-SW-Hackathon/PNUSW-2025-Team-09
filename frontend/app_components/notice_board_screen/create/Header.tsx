import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
//import GoBack from '@/app_assets/main/goback.svg';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
/*
interface HeaderProps {
  onRegister: () => void;
}

export const Header = ({ onRegister }: HeaderProps) => {
  return (
    <View style={styles.topRow}>
      <GoBack
        onPress={() => {
          router.push(`/notice_board`);
        }}
      />

      <Text style={styles.title}>게시판</Text>

      <TouchableOpacity style={styles.registerButton} onPress={onRegister}>
        <Text style={styles.registerButtonText}>등록</Text>
      </TouchableOpacity>
    </View>
  );
};
*/
interface HeaderProps {
  onRegister: () => void;
}

export const Header = ({ onRegister }: HeaderProps) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 뒤로가기 */}
      <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
        <Ionicons name="chevron-back" size={screenWidth * 0.06} color="#000" />
      </TouchableOpacity>

      {/* 제목 */}
      <Text style={styles.title}>게시판</Text>

      {/* 등록 */}
      <TouchableOpacity style={styles.registerButton} onPress={onRegister}>
        <Text style={styles.registerButtonText}>등록</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  topRow: {
    paddingBottom: screenWidth * 0.025,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  /*
  title: {
    fontSize: screenWidth * 0.045,
    fontWeight: 'bold',
    position: 'absolute',
    left: '53%',
    transform: [{ translateX: -screenWidth * 0.045 * 2 }],
  },
  */
  registerButton: {
    backgroundColor: '#434343',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: screenWidth * 0.035,
    fontWeight: '500',
  },
  container: {
    marginTop: screenHeight * 0.06,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: screenWidth * 0.04,
    height: screenHeight * 0.06,
  },
  iconButton: {
    padding: screenWidth * 0.01,
  },
  title: {
    fontSize: screenWidth * 0.045,
    fontWeight: '600',
    color: '#000',
  },
});
