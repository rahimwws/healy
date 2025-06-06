import React, { useEffect, useRef, useCallback } from 'react';
import { Text, View, StyleSheet, StyleProp, TextStyle, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface AnimatedTextProps {
  text: string;
  duration?: number;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  duration = 3000,
  textStyle,
  containerStyle,
}) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isAnimatingRef = useRef(false);

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);

  const startAnimation = useCallback(() => {
    if (isAnimatingRef.current || !text || text.trim() === '') return;
    isAnimatingRef.current = true;
    opacity.value = withTiming(1, { duration: 500, easing: Easing.out(Easing.ease) });
    translateY.value = withTiming(0, { duration: 500, easing: Easing.out(Easing.ease) });

    timerRef.current = setTimeout(() => {
      opacity.value = withTiming(0, { duration: 500, easing: Easing.in(Easing.ease) });
      translateY.value = withTiming(-30, { duration: 500, easing: Easing.in(Easing.ease) });
    }, duration);
  }, [text, duration, opacity, translateY]);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    isAnimatingRef.current = false;
    if (!text || text.trim() === '') return;
    opacity.value = 0;
    translateY.value = 30;
    startAnimation();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [text, duration, opacity, startAnimation, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  if (!text || text.trim() === '') return null;

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.View style={[styles.textContainer, animatedStyle]}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'medium',
  },
});
