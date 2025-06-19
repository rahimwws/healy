import { ReactNode, useCallback, useEffect, useState, } from 'react'
import { useSharedValue } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import Sheet from '@/shared/ui/Sheet/Sheet';
import BottomSheet, { BottomSheetFooter, BottomSheetFooterProps } from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
import { View } from 'react-native';
import styles from './styles';

type Props = {
  onSheetChange: (isExpanded: boolean) => void;
  children: ReactNode
  ref: React.RefObject<BottomSheet>;
}

const HomeSheet = ({ onSheetChange, children, ref: sheetRef }: Props) => {
  const animatedPosition = useSharedValue(-1);
  const animatedTop = useSharedValue(0);

  const handleAnimate = useCallback(
    (from: number, to: number) => {
      if (to > 0.6) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        onSheetChange(true);
      } else {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        onSheetChange(false);
      }
    },
    [onSheetChange]
  );
  const renderFooter = useCallback(
    (props: BottomSheetFooterProps) => (
      <BottomSheetFooter {...props} bottomInset={0}>
        <BlurView intensity={5} tint="light" style={{ height: 10 }} />
      </BottomSheetFooter>
    ),
    []
  );

  return (
    <Sheet
      ref={sheetRef}
      sizes={['15%', '88%']}
      enableDynamicSizing={false}
      index={0}
      scrollViewProps={{
        contentInsetAdjustmentBehavior: 'automatic',
        showsVerticalScrollIndicator: false,
        contentContainerStyle: {
          paddingBottom: 50,
        },
        style: {
          marginTop: animatedTop,
        },
      }}
      detached={true}
      onAnimate={handleAnimate}
      enablePanDownToClose={false}
      enableOverDrag={false}
      enableContentPanningGesture={true}
      enableHandlePanningGesture={true}
      animatedPosition={animatedPosition}
      footerComponent={renderFooter}
    >
      <View style={styles.container}>
        {children}
      </View>
    </Sheet>
  )
}

export default HomeSheet