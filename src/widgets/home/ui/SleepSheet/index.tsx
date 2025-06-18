import { Moon } from '@/shared/assets/interface/health/Moon';
import { useTheme } from '@/shared/lib/theme';
import { BottomSheet, Typography } from '@/shared/ui';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { TouchableOpacity, View } from 'react-native';
import { useMemo } from 'react';
import getStyles from './styles';
import SleepChart from '../SleepChart';

export default function SleepSheet() {
  const { colors, theme } = useTheme();
  const styles = useMemo(() => getStyles(colors), [theme]);

  return (
    <BottomSheet
      sizes={['medium']}
      cornerRadius={0}
      name="sleep-sheet"
      onDismiss={async () => {
        await TrueSheet.dismiss('sleep-sheet');
        await TrueSheet.present('home-sheet');
      }}>
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
            onPress={() => {
              TrueSheet.dismiss('sleep-sheet');
            }}
            style={styles.bottomBtn}>
            <Typography size={18} font="semibold" color="white">
              talk with healy
            </Typography>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
}
