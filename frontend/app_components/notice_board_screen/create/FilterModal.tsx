import React from 'react';
import { Modal, TouchableWithoutFeedback, View, StyleSheet, Dimensions } from 'react-native';
import { ClassFilterCard } from '@/app_components/notice_board_screen/filter_card/ClassFilterCard';
import { DepartmentFilterCard } from '@/app_components/notice_board_screen/filter_card/DepartmentFilterCard';
import { TypeFilterCard } from '@/app_components/notice_board_screen/filter_card/TypeFilterCard';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface FilterModalProps {
  showCard: null | 'class' | 'department' | 'type';
  selection: '반 별 게시판' | '부 별 게시판';
  classFilter1: string;
  deptFilter1: string;
  filter2: string;
  onClose: () => void;
  onClassFilter1Select: (id: string) => void;
  onDeptFilter1Select: (id: string) => void;
  onFilter2Select: (id: string) => void;
}

export const FilterModal = ({
  showCard,
  selection,
  classFilter1,
  deptFilter1,
  filter2,
  onClose,
  onClassFilter1Select,
  onDeptFilter1Select,
  onFilter2Select,
}: FilterModalProps) => {
  return (
    <Modal transparent visible={!!showCard} animationType="slide" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.bottomSheet}>
              <View style={styles.grabber} />
              {showCard === 'class' && (
                <ClassFilterCard
                  selected={classFilter1}
                  onSelect={(id) => {
                    onClassFilter1Select(id);
                    onClose();
                  }}
                />
              )}
              {showCard === 'department' && (
                <DepartmentFilterCard
                  selected={deptFilter1}
                  onSelect={(id) => {
                    onDeptFilter1Select(id);
                    onClose();
                  }}
                />
              )}
              {showCard === 'type' && (
                <TypeFilterCard
                  selected={filter2}
                  onSelect={(id) => {
                    onFilter2Select(id);
                    onClose();
                  }}
                />
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: screenWidth * 0.05,
    borderTopRightRadius: screenWidth * 0.05,
    maxHeight: screenHeight * 0.7,
    paddingBottom: screenHeight * 0.025,
  },
  grabber: {
    alignSelf: 'center',
    width: screenWidth * 0.12,
    height: screenHeight * 0.004,
    borderRadius: screenHeight * 0.002,
    backgroundColor: '#ccc',
    marginTop: screenHeight * 0.018,
    opacity: 0.5,
  },
});
