import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Pressable,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
} from 'react-native';
import { FilterType, FILTER_LABELS } from './FilterButton';

type Props = {
  visible: boolean;
  value: FilterType;
  onClose: () => void;
  onSelect: (v: FilterType) => void;
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const OPTIONS: FilterType[] = ['대기', '거절', '승낙'];

export function FilterSheet({ visible, value, onClose, onSelect }: Props) {
  const slideAnim = useRef(new Animated.Value(screenHeight)).current; // sheet 위치
  const backdropAnim = useRef(new Animated.Value(0)).current; // 배경 opacity

  useEffect(() => {
    if (visible) {
      // 열릴 때
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // 닫을 때
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: screenHeight,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, backdropAnim, slideAnim]);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.backdrop, { opacity: backdropAnim }]} />
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.handle} />

        <View style={styles.optionsRow}>
          {OPTIONS.map((opt) => {
            const selected = opt === value;
            return (
              <Pressable
                key={opt}
                onPress={() => {
                  onSelect(opt);
                  onClose();
                }}
                style={[styles.pillBase, selected ? styles.pillSelected : styles.pillUnselected]}
              >
                <Text style={[styles.pillText, selected && styles.pillTextSelected]}>
                  {FILTER_LABELS[opt]}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.25)' },

  sheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    paddingTop: screenWidth * 0.04,
    borderRadius: 20,
    paddingBottom: screenWidth * 0.1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  handle: {
    alignSelf: 'center',
    width: screenWidth * 0.13,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#DADADA',
    marginBottom: screenWidth * 0.1,
  },

  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: screenWidth * 0.05,
  },

  pillBase: {
    width: screenWidth * 0.2,
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillUnselected: {
    backgroundColor: '#F5F5F5',
  },
  pillSelected: {
    backgroundColor: '#BAE799',
  },
  pillText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#181818',
  },
  pillTextSelected: {
    color: '#181818',
  },
});
