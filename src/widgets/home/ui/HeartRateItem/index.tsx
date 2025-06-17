import { View } from 'react-native';
import { Typography } from '@/shared/ui';
import { useMemo } from 'react';
import { useTheme } from '@/shared/lib/theme';
import getStyles from './styles';

type Props = {
  title: string
  rate: number
}

const HeartRateItem = ({ title, rate }: Props) => {
  const { colors, theme } = useTheme();
  const styles = useMemo(() => getStyles(colors), [theme]);
  return (
    <View style={styles.container}>
      <Typography color="gray" size={16} font="semibold">
        {title}
      </Typography>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <Typography size={30} font="semibold">
          {rate}
        </Typography>
        <Typography color="gray" size={16} top={30}>
          bpm
        </Typography>
      </View>
    </View>
  )
}

export default HeartRateItem