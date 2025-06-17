import { View } from 'react-native';
import { Typography } from '@/shared/ui';
import { useTheme } from '@/shared/lib/theme';
import { useMemo } from 'react';
import getStyles from './styles';

function SleepChart() {
  const { colors, theme } = useTheme();
  const styles = useMemo(() => getStyles(colors), [theme]);

  return (
    <View style={styles.chartWrap}>
      <View
        style={styles.chartTop}>
        <View
          style={[
            { width: '20%', backgroundColor: '#EAF0FD', },
            styles.chartBarItem
          ]}
        />
        <View
          style={[
            { width: '25%', backgroundColor: '#B2C8F7', },
            styles.chartBarItem
          ]}
        />
        <View
          style={[
            { width: '40%', backgroundColor: '#5B51F2', },
            styles.chartBarItem
          ]}
        />
        <View
          style={[
            { width: '15%', backgroundColor: '#3A2D7C', },
            styles.chartBarItem
          ]}
        />
      </View>
      <View style={styles.chartBottom}>
        <View>
          <View style={styles.chartBottomItem}>
            <Typography size={14} font="medium" color="gray">
              Awake
            </Typography>
            <View
              style={[
                { backgroundColor: '#EAF0FD', },
                styles.circle
              ]}
            />
          </View>
          <Typography font="semibold">39 m</Typography>
        </View>
        <View>
          <View style={styles.chartBottomItem}>
            <Typography size={14} font="medium" color="gray">
              REM
            </Typography>
            <View
              style={[
                { backgroundColor: '#B2C8F7', },
                styles.circle
              ]}
            />
          </View>
          <Typography font="semibold">1h 42min</Typography>
        </View>
        <View>
          <View style={styles.chartBottomItem}>
            <Typography size={14} font="medium" color="gray">
              Core
            </Typography>
            <View
              style={[
                { backgroundColor: '#5B51F2', },
                styles.circle
              ]}
            />
          </View>
          <Typography font="semibold">5h 28 mim</Typography>
        </View>
        <View>
          <View style={styles.chartBottomItem}>
            <Typography size={14} font="medium" color="gray">
              Deep
            </Typography>
            <View
              style={[
                { backgroundColor: '#3A2D7C', },
                styles.circle
              ]}
            />
          </View>
          <Typography font="semibold">1 h</Typography>
        </View>
      </View>
    </View>
  )
}

export default SleepChart;