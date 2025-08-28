import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

type ConfirmModalProps = {
  visible: boolean;
  message: string;
  confirmColor?: 'blue' | 'red';
  onClose: () => void;
  onConfirm: () => void;
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export function ConfirmModal({
  visible,
  message,
  confirmColor,
  onClose,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <View style={styles.centered}>
        <View style={styles.dialog}>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonRow}>
            <Pressable style={[styles.button, styles.cancel]} onPress={onClose}>
              <Text style={styles.btnText}>취소</Text>
            </Pressable>
            <Pressable
              style={[
                styles.button,
                confirmColor === 'blue' ? styles.confirmBlue : styles.confirmRed,
              ]}
              onPress={onConfirm}
            >
              <Text style={styles.btnText}>확인</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    width: screenWidth * 0.7,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    elevation: 5,
  },
  message: {
    fontWeight: 'medium',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: screenHeight * 0.025,
    color: '#181818',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    height: screenHeight * 0.05,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: screenWidth * 0.015,
  },
  cancel: {
    backgroundColor: '#DEDEDE',
  },
  confirmBlue: {
    backgroundColor: '#7079FF',
  },
  confirmRed: {
    backgroundColor: '#FF6363',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'semibold',
  },
});
