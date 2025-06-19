import { FillableLine, Typography } from '@/shared/ui';
import { useMemo } from 'react';
import { TouchableOpacity, View, } from 'react-native';
import { useTheme } from '@/shared/lib/theme';
import { Fire, Heart, Moon, Step } from '@/shared/assets';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { HomeSheet } from '@/features/Home'
import HeartRateItem from '../HeartRateItem';
import SleepChart from '../SleepChart';
import getStyles from './styles';

interface HomeSheetProps {
  onSheetChange: (isExpanded: boolean) => void;
}

export default function HomeSheetWidget({ onSheetChange }: HomeSheetProps) {
  const { colors, theme } = useTheme();
  const styles = useMemo(() => getStyles(colors), [theme]);

  return (
    <HomeSheet onSheetChange={onSheetChange}>
      <View style={styles.itemWrap}>
        {/* Header Row */}
        <View style={styles.headRow}>
          {/* Icon with hearts */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            {/* Main heart icon */}
            <View>
              <View style={[{ backgroundColor: '#FF7A6C' }, styles.iconWrap]}>
                {/* Heart SVG */}
                <Heart fill={colors.primary.white} width={20} height={20} />
              </View>
            </View>
            {/* Title */}
            <Typography color="red" size={18} font="semibold">
              Heart rate
            </Typography>
          </View>

          {/* Current bpm */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Typography size={32} font="semibold">
              76
            </Typography>
            <Typography size={18} top={30}>
              bpm
            </Typography>
          </View>
        </View>

        {/* Min/Max Row */}
        <View style={styles.heartRateWrap}>
          {/* Min */}
          <HeartRateItem rate={100} title="Minimum" />
          {/* Max */}
          <HeartRateItem rate={110} title="Maximum" />
        </View>

        {/* Good Heart Rate */}
        <Typography size={18} font="semibold">
          Good Heart rate
        </Typography>
        <Typography color="gray" size={16}>
          Your heart rate is good for now, keep going!
        </Typography>
      </View>
      <TouchableOpacity
        style={styles.itemWrap}
        onPress={async () => {
          // await sheetRef.current?.dismiss();
          await TrueSheet.present('sleep-sheet');
        }}>
        {/* Header Row */}
        <View style={styles.headRow}>
          {/* Icon with hearts */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            {/* Main heart icon */}
            <View>
              <View style={[{ backgroundColor: colors.primary.blue }, styles.iconWrap]}>
                {/* Heart SVG */}
                <Moon fill={colors.primary.white} width={20} height={20} />
              </View>
            </View>
            {/* Title */}
            <Typography color="blue" size={18} font="semibold">
              Asleep Time
            </Typography>
          </View>

          {/* Current bpm */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Typography size={32} font="semibold">
              8
            </Typography>
            <Typography size={18} top={49} color="gray">
              hr
            </Typography>
            <Typography size={32} font="semibold">
              29
            </Typography>
            <Typography size={18} top={35} color="gray">
              min
            </Typography>
          </View>
        </View>

        {/* Min/Max Row */}
        <SleepChart />

        <Typography size={18} font="semibold">
          You had enough rest today.
        </Typography>
        <Typography color="gray" size={16}>
          You can enjoy your day and achieve you goals.
        </Typography>
      </TouchableOpacity>
      <View style={styles.itemWrap}>
        {/* Header Row */}
        <View style={styles.headRow}>
          {/* Icon with hearts */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            {/* Main heart icon */}
            <View>
              <View style={[{ backgroundColor: colors.primary.green }, styles.iconWrap]}>
                {/* Heart SVG */}
                <Step fill={colors.primary.white} width={18} height={18} />
              </View>
            </View>
            {/* Title */}
            <Typography color="green" size={18} font="semibold">
              Steps
            </Typography>
          </View>

          {/* Current bpm */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Typography size={26} font="semibold">
              1 100
            </Typography>
            <Typography size={18} top={15} color="gray">
              steps
            </Typography>
            <View style={styles.stepsCurrent} />
            <Typography size={26} font="semibold">
              2.56
            </Typography>
            <Typography size={18} top={15} color="gray">
              km
            </Typography>
          </View>
        </View>
        <View style={styles.goal}>
          <Typography size={18} font="medium" color="gray">
            Goal
          </Typography>
          <Typography size={18} font="medium">
            1 500 steps | 10 km
          </Typography>
        </View>
        <FillableLine
          fillPercent="80%"
          lineStyle={{
            backgroundColor: colors.primary.green,
          }}
        />
        <Typography size={18} font="semibold">
          You had enough rest today.
        </Typography>
        <Typography color="gray" size={16}>
          You can enjoy your day and achieve you goals.
        </Typography>
      </View>
      <View style={styles.itemWrap}>
        {/* Header Row */}
        <View style={styles.headRow}>
          {/* Icon with hearts */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            {/* Main heart icon */}
            <View>
              <View style={[{ backgroundColor: colors.primary.orange }, styles.iconWrap]}>
                <Fire fill={colors.primary.white} width={20} height={20} />
              </View>
            </View>
            {/* Title */}
            <Typography color="orange" size={18} font="semibold">
              Calories
            </Typography>
          </View>

          {/* Current bpm */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Typography size={26} font="semibold">
              200
            </Typography>
            <Typography size={18} top={15} color="gray">
              kcal
            </Typography>
          </View>
        </View>
        <View style={styles.goal}>
          <Typography size={18} font="medium" color="gray">
            Normal for your
          </Typography>
          <Typography size={18} font="medium">
            200 kcal
          </Typography>
        </View>
        <FillableLine
          fillPercent="80%"
          lineStyle={{
            backgroundColor: colors.primary.orange,
          }}
        />
        <Typography size={18} font="semibold">
          You burned 300 kcal today.
        </Typography>
        <Typography color="gray" size={16} align="left">
          You can enjoy your day and achieve you goals.
        </Typography>
      </View>
    </HomeSheet>
  );
}
