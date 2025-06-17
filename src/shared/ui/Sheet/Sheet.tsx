import { useTheme } from '@/shared/lib/theme';
import BottomSheet, {
  BottomSheetProps,
  BottomSheetView,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { BottomSheetScrollViewProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types';
import { memo, forwardRef, ReactNode } from 'react';
import { SharedValue } from 'react-native-reanimated';

interface SheetProps extends Partial<BottomSheetProps> {
  children: ReactNode;
  sizes?: (number | string)[] | SharedValue<(string | number)[]>;
  scrollViewProps?: Partial<BottomSheetScrollViewProps>;
  headerComponent?: () => ReactNode;
}

const Sheet = memo(
  forwardRef<BottomSheet, SheetProps>(
    ({ children, sizes, style, scrollViewProps, headerComponent, ...props }, ref) => {
      const { colors } = useTheme();
      return (
        <BottomSheet
          ref={ref}
          snapPoints={sizes}
          style={[
            {
              backgroundColor: colors.primary.white,
              borderTopLeftRadius: 45,
              borderTopRightRadius: 45,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              overflow: 'hidden',
            },
            style,
          ]}
          handleIndicatorStyle={{
            display: 'none',
            backgroundColor: colors.primary.white,
            width: 40,
          }}
          {...props}>
          {headerComponent?.()}
          {scrollViewProps ? (
            <BottomSheetScrollView {...scrollViewProps}>{children}</BottomSheetScrollView>
          ) : (
            <BottomSheetView style={{ flex: 1, alignItems: 'center' }}>{children}</BottomSheetView>
          )}
        </BottomSheet>
      );
    }
  )
);

export default Sheet;
