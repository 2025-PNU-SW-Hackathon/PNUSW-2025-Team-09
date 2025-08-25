import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import CameraIcon from '@/app_assets/notice_board_screen/camera.svg';
import FileIcon from '@/app_assets/notice_board_screen/file.svg';

const { width: screenWidth } = Dimensions.get('window');

interface FileUploadSectionProps {
  onCameraPress: () => void;
  onFilePress: () => void;
}

export const FileUploadSection = ({ onCameraPress, onFilePress }: FileUploadSectionProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.uploadButton} onPress={onFilePress}>
        <FileIcon width={24} height={24} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.uploadButton} onPress={onCameraPress}>
        <CameraIcon width={24} height={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: screenWidth * 0.075,
    paddingVertical: screenWidth * 0.01,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  uploadButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'transparent',
  },
});
