import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import { Header } from '../../app_components/notice_board_screen/Header';
import { BoardTabs } from '../../app_components/notice_board_screen/BoardTabs';
import { NoticeList } from '../../app_components/notice_board_screen/NoticeList';
import { WriteButton } from '../../app_components/notice_board_screen/WriteButton';

import { ClassFilterButton } from '../../app_components/notice_board_screen/filter_button/ClassFilterButton';
import { DepartmentFilterButton } from '../../app_components/notice_board_screen/filter_button/DepartmentFilterButton';
import { TypeFilterButton } from '../../app_components/notice_board_screen/filter_button/TypeFilterButton';

import { ClassFilterCard } from '../../app_components/notice_board_screen/filter_card/ClassFilterCard';
import { DepartmentFilterCard } from '../../app_components/notice_board_screen/filter_card/DepartmentFilterCard';
import { TypeFilterCard } from '../../app_components/notice_board_screen/filter_card/TypeFilterCard';
import { useBoardParams } from '@/contexts/BoardParamsContext';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const NoticeBoardScreen = () => {
  const { params } = useBoardParams();
  const [selectedTab, setSelectedTab] = useState<'반' | '부'>(params.tab === '부' ? '부' : '반');
  const [classFilter1, setClassFilter1] = useState(
    params.tab === '반' ? params.filter1?.toString() || '전체' : '전체',
  );
  const [classFilter2, setClassFilter2] = useState(
    params.tab === '반' ? params.filter2?.toString() || '전체' : '전체',
  );
  const [deptFilter1, setDeptFilter1] = useState(
    params.tab === '부' ? params.filter1?.toString() || '전체' : '전체',
  );
  const [deptFilter2, setDeptFilter2] = useState(
    params.tab === '부' ? params.filter2?.toString() || '전체' : '전체',
  );
  const filter1 = selectedTab === '반' ? classFilter1 : deptFilter1;
  const filter2 = selectedTab === '반' ? classFilter2 : deptFilter2;
  const [showCard, setShowCard] = useState<null | 'class' | 'department' | 'type'>(null);

  const slideAnim = useRef(new Animated.Value(screenHeight)).current;

  useEffect(() => {
    if (showCard) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [showCard, slideAnim]);

  return (
    <View style={styles.container}>
      <Header />
      <BoardTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <View style={styles.filterRow}>
        {selectedTab === '반' ? (
          <ClassFilterButton label={filter1} onPress={() => setShowCard('class')} />
        ) : (
          <DepartmentFilterButton label={filter1} onPress={() => setShowCard('department')} />
        )}
        <TypeFilterButton label={filter2} onPress={() => setShowCard('type')} />
      </View>
      <NoticeList
        key={`${selectedTab}-${selectedTab === '반' ? classFilter1 : deptFilter1}-${selectedTab === '반' ? classFilter2 : deptFilter2}`} // ← 필터 바뀔 때 강제 리마운트
        selectedTab={selectedTab}
        filter1={selectedTab === '반' ? classFilter1 : deptFilter1}
        filter2={selectedTab === '반' ? classFilter2 : deptFilter2}
      />
      <WriteButton />

      <Modal
        transparent
        visible={!!showCard}
        animationType="none"
        onRequestClose={() => setShowCard(null)}
      >
        <TouchableWithoutFeedback onPress={() => setShowCard(null)}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <Animated.View
                style={[styles.bottomSheet, { transform: [{ translateY: slideAnim }] }]}
              >
                <View style={styles.grabber} />
                {showCard === 'class' && (
                  <ClassFilterCard
                    selected={classFilter1}
                    onSelect={(id) => {
                      setClassFilter1(id);
                      setShowCard(null);
                    }}
                  />
                )}
                {showCard === 'department' && (
                  <DepartmentFilterCard
                    selected={deptFilter1}
                    onSelect={(id) => {
                      setDeptFilter1(id);
                      setShowCard(null);
                    }}
                  />
                )}
                {showCard === 'type' && (
                  <TypeFilterCard
                    selected={filter2}
                    onSelect={(id) => {
                      if (selectedTab === '반') {
                        setClassFilter2(id);
                      } else {
                        setDeptFilter2(id);
                      }
                      setShowCard(null);
                    }}
                  />
                )}
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default NoticeBoardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: screenWidth * 0.04,
  },
  filterRow: {
    flexDirection: 'row',
    gap: screenWidth * 0.02,
    marginVertical: screenHeight * 0.015,
  },
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
