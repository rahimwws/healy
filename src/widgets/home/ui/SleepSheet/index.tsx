import { Moon } from '@/shared/assets/interface/health/Moon';
import { useTheme } from '@/shared/lib/theme';
import { Typography } from '@/shared/ui';
import { TouchableOpacity, View } from 'react-native';
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import getStyles from './styles';
import SleepChart from '../SleepChart';
import Sheet from '@/shared/ui/Sheet/Sheet';
import BottomSheet from '@gorhom/bottom-sheet';

type Props = {
  onPressTalk?: () => void
  onClose?: () => void
}

const SleepSheet = forwardRef<BottomSheet, Props>((props, ref) => {
  const {
    onPressTalk,
    onClose
  } = props;
  const { colors, theme } = useTheme();
  const styles = useMemo(() => getStyles(colors), [theme]);
  const didMounted = useRef(false); // to prevent calling handleClose on open

  useEffect(() => {
    setTimeout(() => {
      didMounted.current = true;
    }, 2000); // short delay
  }, []);

  const handleClose = () => {
    if (didMounted.current) {
      onClose?.();
    }
  };

  return (
    <Sheet
      ref={ref}
      sizes={['60%']}
      onClose={handleClose}
      enableDynamicSizing={false}
      enablePanDownToClose
      animateOnMount
      index={-1}
    >
      <View style={styles.container}>
        <View style={styles.headWrap}>
          <View style={styles.headDateWrap}>
            <Typography size={14} font="medium" color="gray">
              W
            </Typography>
            <View style={styles.headDate}>
              <Typography font="medium" color="white">
                27
              </Typography>
            </View>
          </View>
          <Typography size={22} font="semibold">
            Sleep
          </Typography>
          <View style={styles.moonWrap}>
            {/* Heart SVG */}
            <Moon fill={colors.primary.white} width={25} height={25} />
          </View>
        </View>
        <View style={{ marginTop: 10, alignItems: 'center' }}>
          <View style={styles.sleepTime}>
            <Typography size={40} font="semibold" color="black">
              8
            </Typography>
            <Typography size={20} font="semibold" bottom={20} color="gray">
              hr
            </Typography>
            <Typography size={40} font="semibold" color="black">
              27
            </Typography>
            <Typography size={20} font="semibold" color="gray" bottom={10}>
              min
            </Typography>
          </View>

          <Typography size={18} font="semibold" color="blue" top={3}>
            Rahim, this is your perfect sleep
          </Typography>
        </View>
        {/* Sleep chart */}
        <SleepChart />
        <View style={styles.bottomActions}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPressTalk}
            style={styles.bottomBtn}>
            <Typography size={18} font="semibold" color="white">
              talk with healy
            </Typography>
          </TouchableOpacity>
        </View>
      </View>
    </Sheet>
  );
})

export default SleepSheet;