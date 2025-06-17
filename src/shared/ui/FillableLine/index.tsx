import { useTheme } from '@/shared/lib/theme'
import { useMemo } from 'react'
import { View, ViewStyle } from 'react-native'
import getStyles from './styles';

type Props = {
  /** @default 50% */
  fillPercent?: `${number}%`,
  bgLineStyle?: ViewStyle
  lineStyle?: ViewStyle
}

function FillableLine({ fillPercent, bgLineStyle, lineStyle }: Props) {
  const { colors, theme } = useTheme();
  const styles = useMemo(() => getStyles(colors), [theme]);

  return (
    <View
      style={[
        styles.container,
        bgLineStyle,
      ]}
    >
      <View
        style={[
          { width: fillPercent },
          styles.line,
          lineStyle,
        ]}
      />
    </View>
  )
}

export default FillableLine