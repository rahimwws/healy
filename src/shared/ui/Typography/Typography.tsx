import React, { memo } from 'react';
import { Text, StyleProp, TextStyle, TextProps, FlexStyle, View } from 'react-native';

import { ColorsT, fontsT, useTheme } from '@/shared/lib/theme';
import ColorPair from '@/shared/lib/types/ui/ColorPair';
import AlignSetting from '@/shared/lib/types/ui/TypographyAlignSetting';

type Props = {
  children: React.ReactNode;
  size?: number;
  color?: keyof ColorsT['primary'] | ColorPair;
  font?: keyof fontsT;
  align?: AlignSetting;
  styles?: StyleProp<TextStyle>;
  textProps?: TextProps;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  uppercase?: boolean;
  width?: FlexStyle['width'];
  icon?: React.ReactNode;
};

const Typography = memo(
  ({
    children,
    size = 16,
    color = 'black',
    font = 'regular',
    align = 'center',
    width = 'auto',
    styles,
    textProps,
    top,
    bottom,
    left,
    right,
    uppercase,
    icon,
  }: Props) => {
    const { colors } = useTheme();
    let resolvedColor = colors.primary.black;

    if (typeof color === 'string') {
      resolvedColor = colors.primary[color] ?? colors.primary.black;
    } else if (Array.isArray(color)) {
      const [section, key] = color as [keyof ColorsT, string];
      const sectionColors = colors[section];
      resolvedColor = (sectionColors as Record<string, string>)?.[key] ?? colors.primary.black;
    }
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {icon && <View style={{ marginRight: 5 }}>{icon}</View>}
        <Text
          allowFontScaling={false}
          style={{
            width,
            fontFamily: font,
            fontSize: size,
            color: resolvedColor,
            textAlign: align,
            marginTop: top ? `${top}%` : undefined,
            marginBottom: bottom ? `${bottom}%` : undefined,
            marginLeft: left ? `${left}%` : undefined,
            marginRight: right ? `${right}%` : undefined,
            textTransform: uppercase ? 'uppercase' : 'none',
            ...(styles as object),
          }}
          {...textProps}>
          {children}
        </Text>
      </View>
    );
  }
);
Typography.displayName = 'Typography';
export default Typography;
