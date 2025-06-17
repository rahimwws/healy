import { TrueSheet, TrueSheetProps } from '@lodev09/react-native-true-sheet';
import { useWindowDimensions, View } from 'react-native';

export default function BottomSheet({
  ref,
  children,
  ...props
}: TrueSheetProps & { ref?: React.RefObject<TrueSheet>; children?: React.ReactNode }) {
  const { height } = useWindowDimensions();
  return (
    <TrueSheet
      ref={ref}
      {...props}
      dimmed
      grabber={false}
      backgroundColor="transparent"
      style={{
        paddingHorizontal: 10,
        paddingTop: 40,
      }}>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: height * 0.45,
          borderRadius: 45,
          overflow: 'hidden',
        }}>
        {children}
      </View>
    </TrueSheet>
  );
}
