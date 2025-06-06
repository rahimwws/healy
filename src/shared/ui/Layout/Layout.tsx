import React, { memo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/shared/lib/theme';

interface ScreenLayoutProps {
  children: React.ReactNode;
  px?: number;
  styles?: StyleProp<ViewStyle>;
  showPx?: boolean;
  pt?: number;
  pb?: number;
}

const Layout: React.FC<ScreenLayoutProps> = memo(
  ({ children, px = 20, styles, showPx = true, pt, pb }) => {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme();
    return (
      <View
        style={[
          {
            flex: 1,
            backgroundColor: colors.primary.white,
            paddingHorizontal: showPx ? px : 0,
            paddingTop: pt ?? insets.top,
            paddingBottom: pb ?? insets.bottom,
          },
          styles as object,
        ]}>
        {children}
      </View>
    );
  }
);
Layout.displayName = 'Layout';
export default Layout;
