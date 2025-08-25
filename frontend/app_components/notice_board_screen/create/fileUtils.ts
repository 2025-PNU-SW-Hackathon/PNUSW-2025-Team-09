import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

export interface AttachedFile {
  id: string;
  name: string;
  uri: string;
  type: 'image' | 'document';
  size?: number;
}

// 권한 요청 함수
export const requestCameraPermission = async (): Promise<boolean> => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  return status === 'granted';
};

export const requestMediaLibraryPermission = async (): Promise<boolean> => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  return status === 'granted';
};

// 이미지 선택 함수들
export const pickImageFromCamera = async (): Promise<AttachedFile | null> => {
  try {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      throw new Error('카메라 권한이 필요합니다.');
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      return {
        id: Date.now().toString(),
        name: `image_${Date.now()}.jpg`,
        uri: asset.uri,
        type: 'image',
        size: asset.fileSize,
      };
    }
    return null;
  } catch (error) {
    console.error('카메라에서 이미지 선택 실패:', error);
    throw error;
  }
};

export const pickImageFromGallery = async (): Promise<AttachedFile | null> => {
  try {
    const hasPermission = await requestMediaLibraryPermission();
    if (!hasPermission) {
      throw new Error('갤러리 권한이 필요합니다.');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      return {
        id: Date.now().toString(),
        name: asset.fileName || `image_${Date.now()}.jpg`,
        uri: asset.uri,
        type: 'image',
        size: asset.fileSize,
      };
    }
    return null;
  } catch (error) {
    console.error('갤러리에서 이미지 선택 실패:', error);
    throw error;
  }
};

// 문서 선택 함수
export const pickDocument = async (): Promise<AttachedFile | null> => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*', // 모든 파일 타입 허용
      copyToCacheDirectory: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      return {
        id: Date.now().toString(),
        name: asset.name,
        uri: asset.uri,
        type: 'document',
        size: asset.size,
      };
    }
    return null;
  } catch (error) {
    console.error('문서 선택 실패:', error);
    throw error;
  }
};

// 파일 크기 포맷팅
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
