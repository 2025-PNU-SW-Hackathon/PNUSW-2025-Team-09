import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

export interface AttachedFile {
  id: string;
  name: string;
  uri: string;
  type: 'image' | 'document';
  size?: number;
}

interface AttachedFilesListProps {
  files: AttachedFile[];
  onRemoveFile: (fileId: string) => void;
}

export const AttachedFilesList = ({ files, onRemoveFile }: AttachedFilesListProps) => {
  if (files.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>첨부된 파일 ({files.length})</Text>
      {files.map((file) => (
        <View key={file.id} style={styles.fileItem}>
          {file.type === 'image' ? (
            <Image source={{ uri: file.uri }} style={styles.imageThumbnail} />
          ) : (
            <View style={styles.documentIcon}>
              <Ionicons name="document" size={24} color="#666" />
            </View>
          )}
          <View style={styles.fileInfo}>
            <Text style={styles.fileName} numberOfLines={1}>
              {file.name}
            </Text>
            {file.size && (
              <Text style={styles.fileSize}>{(file.size / 1024 / 1024).toFixed(2)} MB</Text>
            )}
          </View>
          <TouchableOpacity style={styles.removeButton} onPress={() => onRemoveFile(file.id)}>
            <Ionicons name="close-circle" size={20} color="#FF6B6B" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: screenWidth * 0.075,
    paddingVertical: screenWidth * 0.02,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: screenWidth * 0.02,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: screenWidth * 0.015,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  imageThumbnail: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginRight: screenWidth * 0.025,
  },
  documentIcon: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: screenWidth * 0.025,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  fileSize: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  removeButton: {
    padding: 4,
  },
});
