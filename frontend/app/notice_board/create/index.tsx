import React, { useEffect, useRef, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Dimensions,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { router } from 'expo-router';
import { Header } from '@/app_components/notice_board_screen/create/Header';
import { BoardSelection } from '@/app_components/notice_board_screen/create/BoardSelection';
import { FilterSection } from '@/app_components/notice_board_screen/create/FilterSection';
import { InputSection } from '@/app_components/notice_board_screen/create/InputSection';
import { FileUploadSection } from '@/app_components/notice_board_screen/create/FileUploadSection';
import { AttachedFilesList } from '@/app_components/notice_board_screen/create/AttachedFilesList';
import {
  pickImageFromCamera,
  pickImageFromGallery,
  pickDocument,
  AttachedFile as AttachedFileType,
} from '@/app_components/notice_board_screen/create/fileUtils';
import { ClassFilterCard } from '@/app_components/notice_board_screen/filter_card/ClassFilterCard';
import { DepartmentFilterCard } from '@/app_components/notice_board_screen/filter_card/DepartmentFilterCard';
import { TypeFilterCard } from '@/app_components/notice_board_screen/filter_card/TypeFilterCard';
import { useBoardParams } from '@/contexts/BoardParamsContext';
import publicApi from '@/api/clients/publicApi';
import { GetPostsResponse } from '@/types/notice_board_screen/getPostsResponse';
import { useBoardData } from '@/contexts/BoardDataContext';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// 첨부 파일 타입 정의
type AttachedFile = AttachedFileType;

export default function NoticeCreateScreen() {
  const params = useLocalSearchParams();
  const [selection, setSelection] = useState<'반 별 게시판' | '부 별 게시판'>(
    params.tab === '부' ? '부 별 게시판' : '반 별 게시판', // 최초 진입 시 URL의 탭 유지
  );
  const [classFilter1, setClassFilter1] = useState(
    params.tab === '반' ? params.filter1?.toString() || '반 선택' : '반 선택',
  );
  const [classFilter2, setClassFilter2] = useState(
    params.tab === '반' ? params.filter2?.toString() || '글 유형 선택' : '글 유형 선택',
  );
  const [deptFilter1, setDeptFilter1] = useState(
    params.tab === '부' ? params.filter1?.toString() || '부 선택' : '부 선택',
  );
  const [deptFilter2, setDeptFilter2] = useState(
    params.tab === '부' ? params.filter2?.toString() || '글 유형 선택' : '글 유형 선택',
  );
  const filter1 = selection === '반 별 게시판' ? classFilter1 : deptFilter1;
  const filter2 = selection === '반 별 게시판' ? classFilter2 : deptFilter2;
  const [showCard, setShowCard] = useState<null | 'class' | 'department' | 'type'>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const { setParams } = useBoardParams();
  const { setPosts } = useBoardData();

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

  const handleRegister = async () => {
    if (!title.trim()) {
      Alert.alert('알림', '제목을 입력해 주세요.');
      return;
    }
    if (!content.trim()) {
      Alert.alert('알림', '내용을 입력해 주세요.');
      return;
    }

    try {
      // 필수 선택값 검증
      if (selection === '반 별 게시판' && classFilter1 === '반 선택') {
        Alert.alert('알림', '반을 선택해 주세요.');
        return;
      }
      if (selection === '부 별 게시판' && deptFilter1 === '부 선택') {
        Alert.alert('알림', '부서를 선택해 주세요.');
        return;
      }
      if (filter2 === '글 유형 선택') {
        Alert.alert('알림', '글 유형을 선택해 주세요.');
        return;
      }

      await publicApi.post('/notice-board/post', {
        boardType: selection === '반 별 게시판' ? '반' : '부',
        classType: filter1,
        contentType: filter2,
        authorNickname: 'byunggil',
        title: title,
        content: content,
      });

      const response = await publicApi.get<GetPostsResponse>('/notice-board/get', {
        params: {
          boardType: selection === '반 별 게시판' ? '반' : '부',
          classType: filter1,
          contentType: filter2,
          limit: 20,
        },
      });

      setPosts(response.data.posts);

      const tab = selection === '반 별 게시판' ? '반' : '부';
      setParams({ tab, filter1, filter2 });
      router.back();
    } catch (e) {
      console.error(e);
      Alert.alert('오류', '저장 중 문제가 발생했어요.');
    }
  };

  const handleFilter1Press = () => {
    setShowCard(selection === '반 별 게시판' ? 'class' : 'department');
  };

  const handleFilter2Press = () => {
    setShowCard('type');
  };

  const handleCameraPress = () => {
    Alert.alert('이미지 선택', '이미지를 선택하는 방법을 선택하세요', [
      {
        text: '카메라',
        onPress: async () => {
          try {
            const file = await pickImageFromCamera();
            if (file) {
              addAttachedFile(file);
            }
          } catch (error) {
            Alert.alert(
              '오류',
              error instanceof Error ? error.message : '이미지 선택에 실패했습니다.',
            );
          }
        },
      },
      {
        text: '갤러리',
        onPress: async () => {
          try {
            const file = await pickImageFromGallery();
            if (file) {
              addAttachedFile(file);
            }
          } catch (error) {
            Alert.alert(
              '오류',
              error instanceof Error ? error.message : '이미지 선택에 실패했습니다.',
            );
          }
        },
      },
      {
        text: '취소',
        style: 'cancel',
      },
    ]);
  };

  const handleFilePress = async () => {
    try {
      const file = await pickDocument();
      if (file) {
        addAttachedFile(file);
      }
    } catch (error) {
      Alert.alert('오류', error instanceof Error ? error.message : '파일 선택에 실패했습니다.');
    }
  };

  const addAttachedFile = (file: AttachedFile) => {
    setAttachedFiles((prev) => [...prev, file]);
  };

  const removeAttachedFile = (fileId: string) => {
    setAttachedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />

        <Header onRegister={handleRegister} />

        <View style={styles.spacer}></View>

        <BoardSelection selection={selection} onSelectionChange={setSelection} />

        <View style={styles.spacer}></View>

        <FilterSection
          selection={selection}
          filter1={filter1}
          filter2={filter2}
          onFilter1Press={handleFilter1Press}
          onFilter2Press={handleFilter2Press}
        />

        <View style={styles.spacer}></View>

        <InputSection
          title={title}
          content={content}
          onTitleChange={setTitle}
          onContentChange={setContent}
        />
      </View>

      <AttachedFilesList files={attachedFiles} onRemoveFile={removeAttachedFile} />

      <FileUploadSection onCameraPress={handleCameraPress} onFilePress={handleFilePress} />

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
                      if (selection === '반 별 게시판') {
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: screenWidth * 0.05,
  },
  spacer: {
    marginBottom: screenHeight * 0.01,
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
