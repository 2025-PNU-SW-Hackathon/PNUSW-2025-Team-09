import { View, StyleSheet, Dimensions } from 'react-native';
import CherryBlossoms from '@/app_assets/class/cherry-blossoms.svg';
import Chrysanthemum from '@/app_assets/class/chrysanthemum.svg';
import Dandelion from '@/app_assets/class/dandelion.svg';
import Forsythia from '@/app_assets/class/forsythia.svg';
import Rose from '@/app_assets/class/rose.svg';
import Sunflower from '@/app_assets/class/sunflower.svg';
import { SVGProps } from 'react';

const { width: screenWidth } = Dimensions.get('window');

type ClassName = keyof typeof ClassIcons;

interface ClassIcon {
  className?: ClassName;
  width?: number;
  height?: number;
}

const styles = StyleSheet.create({
  sticker: {
    width: screenWidth * 0.06,
    height: screenWidth * 0.06,
    borderRadius: screenWidth * 0.03,
    backgroundColor: 'red',
  },
});

const ClassIcons = {
  벚꽃반: CherryBlossoms,
  국화반: Chrysanthemum,
  민들레반: Dandelion,
  개나리반: Forsythia,
  장미반: Rose,
  해바라기반: Sunflower,
  결강: () => <View style={styles.sticker} />,
};

export const ClassIcon = ({ className, width, height }: ClassIcon) => {
  if (!className) return;

  const Icon = ClassIcons[className] as React.FC<SVGProps<SVGSVGElement>>;

  return <Icon width={width} height={height} />;
};
