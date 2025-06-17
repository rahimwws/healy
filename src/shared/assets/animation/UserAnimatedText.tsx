import React, { useEffect, useRef, useCallback } from 'react';
import { Text, View, StyleSheet, StyleProp, TextStyle, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface UserAnimatedTextProps {
  text: string;
  duration?: number;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  isFinished?: boolean;
}

export const UserAnimatedText: React.FC<UserAnimatedTextProps> = ({
  text,
  duration = 3000,
  textStyle,
  containerStyle,
  isFinished = false,
}) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasAnimatedRef = useRef(false);
  const previousTextRef = useRef(text);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);

  const startAnimation = useCallback(() => {
    if (!text || text.trim() === '') return;

    // Reset animation state if text changed from empty to non-empty
    if (previousTextRef.current === '' && text !== '') {
      hasAnimatedRef.current = false;
      opacity.value = 0;
      translateY.value = 30;
    }

    // If we haven't animated yet, do the entrance animation
    if (!hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      opacity.value = withTiming(1, { duration: 500, easing: Easing.out(Easing.ease) });
      translateY.value = withTiming(0, { duration: 500, easing: Easing.out(Easing.ease) });
    }

    // If speech is finished, do the exit animation
    if (isFinished) {
      timerRef.current = setTimeout(() => {
        opacity.value = withTiming(0, { duration: 500, easing: Easing.in(Easing.ease) });
        translateY.value = withTiming(-30, { duration: 500, easing: Easing.in(Easing.ease) });
      }, duration);
    }

    previousTextRef.current = text;
  }, [text, duration, opacity, translateY, isFinished]);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (!text || text.trim() === '') {
      hasAnimatedRef.current = false;
      opacity.value = 0;
      translateY.value = 30;
      previousTextRef.current = '';
      return;
    }

    startAnimation();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [text, duration, opacity, startAnimation, translateY, isFinished]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  if (!text || text.trim() === '') return null;

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.View style={[styles.textContainer, animatedStyle]}>
        <View style={styles.userContainer}>
          <View style={styles.userDot} />
          <Text style={[styles.user, textStyle]}>You</Text>
          <View style={styles.userDot} />
        </View>
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
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  user: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'bold',
  },
  userDot: {
    width: 25,
    height: 1.5,
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
  },
});
