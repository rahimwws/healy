import React, { useEffect, useState, useCallback } from 'react';
import { Canvas, Path, LinearGradient, vec, Blur } from '@shopify/react-native-skia';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const GRADIENT_COLORS = [
  '#FF833F',
  '#FFC72F',
  '#E5FF3F',
  '#90FF41',
  '#43FF91',
  '#0FFBFF',
  '#4193FF',
  '#393FFF',
  '#A73BFF',
  '#FF37DA',
  '#FF3E3E',
];

const GRADIENT_POSITIONS = [
  0, 0.0698238, 0.136807, 0.20379, 0.297255, 0.435895, 0.569862, 0.668, 0.794178, 0.890758, 1,
];

const GRADIENT_HEIGHT = 280;

interface AnimatedValues {
  path: string;
  opacity: number;
}

interface GradientBackgroundProps {
  volume: number;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({ volume }) => {
  const [animatedValues, setAnimatedValues] = useState<AnimatedValues>({
    path: `
      M 0 ${GRADIENT_HEIGHT * 0.3}
      C ${width * 0.2} ${GRADIENT_HEIGHT * 0.4} ${width * 0.4} ${GRADIENT_HEIGHT * 0.6} ${width * 0.6} ${GRADIENT_HEIGHT * 0.5}
      C ${width * 0.8} ${GRADIENT_HEIGHT * 0.4} ${width * 0.9} ${GRADIENT_HEIGHT * 0.7} ${width} ${GRADIENT_HEIGHT * 0.45}
      L ${width} ${GRADIENT_HEIGHT}
      L 0 ${GRADIENT_HEIGHT}
      Z
    `,
    opacity: 0.2,
  });

  const calculateValues = useCallback((volume: number) => {
    const normalizedVolume = Math.max(0, Math.min(1, (volume + 2) / 12));
    const power = 2;

    const baseHeight = GRADIENT_HEIGHT * 0.2;
    const maxHeight = GRADIENT_HEIGHT * 0.8;
    const heightRange = maxHeight - baseHeight;

    const adjustedVolume = Math.pow(normalizedVolume, power);

    const point1 = baseHeight + heightRange * (1 - adjustedVolume) * 0.8;
    const point2 = baseHeight + heightRange * (1 - adjustedVolume) * 0.9;
    const point3 = baseHeight + heightRange * (1 - adjustedVolume);
    const point4 = baseHeight + heightRange * (1 - adjustedVolume) * 0.9;
    const point5 = baseHeight + heightRange * (1 - adjustedVolume) * 0.8;

    const path = `
      M 0 ${baseHeight}
      C ${width * 0.2} ${point1} ${width * 0.4} ${point2} ${width * 0.6} ${point3}
      C ${width * 0.8} ${point4} ${width * 0.9} ${point5} ${width} ${baseHeight}
      L ${width} ${GRADIENT_HEIGHT}
      L 0 ${GRADIENT_HEIGHT}
      Z
    `;

    const opacity = 0.15 + 0.1 * normalizedVolume;

    return { path, opacity };
  }, []);

  useEffect(() => {
    setAnimatedValues(calculateValues(volume));
  }, [volume, calculateValues]);

  return (
    <Canvas
      style={{
        position: 'absolute',
        bottom: 0,
        width: width,
        height: GRADIENT_HEIGHT,
      }}>
      <Path path={animatedValues.path} opacity={animatedValues.opacity}>
        <LinearGradient
          start={vec(width, GRADIENT_HEIGHT)}
          end={vec(0, GRADIENT_HEIGHT)}
          colors={GRADIENT_COLORS}
          positions={GRADIENT_POSITIONS}
        />
        <Blur blur={30} />
      </Path>
    </Canvas>
  );
};

export default GradientBackground;
