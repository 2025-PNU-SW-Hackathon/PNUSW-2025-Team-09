import { View, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';
import Person from '@/app_assets/main/class_request/list/person.svg';
import Menu from '@/app_assets/main/menu.svg';
import { useEffect, useState } from 'react';
import { getCurrentUserName } from '@/api/login';

const { width: screenWidth } = Dimensions.get('window');

export const Header = () => {
  const opacity = useState(new Animated.Value(0))[0];
  const opacity2 = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1700,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      Animated.timing(opacity2, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    }, 1500);
  }, [opacity, opacity2]);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <Animated.Text style={{ fontSize: 24, fontWeight: '400', opacity: opacity }}>
            안녕하세요,
          </Animated.Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Animated.Text style={{ fontSize: 24, fontWeight: 'bold', opacity: opacity2 }}>
              {getCurrentUserName()}
            </Animated.Text>
            <Animated.Text style={{ fontSize: 24, fontWeight: '400', opacity: opacity2 }}>
              {' '}
              선생님
            </Animated.Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity style={[styles.icon, { marginRight: screenWidth * 0.02 }]}>
            <Person width={screenWidth * 0.08} height={screenWidth * 0.08} fill="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <Menu width={screenWidth * 0.08} height={screenWidth * 0.08} fill="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginLeft: screenWidth * 0.05,
    marginRight: screenWidth * 0.05,
    marginTop: screenWidth * 0.1,
  },
  icon: {
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: screenWidth * 0.05,
    backgroundColor: '#FFFFFF',
  },
});
