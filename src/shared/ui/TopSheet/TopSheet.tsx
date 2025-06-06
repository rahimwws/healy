import React from 'react';
import { View, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useTheme } from '@/shared/lib/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './style';
import * as Haptics from 'expo-haptics';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const INITIAL_HEIGHT = SCREEN_HEIGHT * 0.17;
const MAX_HEIGHT = SCREEN_HEIGHT * 0.8;
const GESTURE_THRESHOLD = 20;

interface TopSheetProps {
  initialContent: React.ReactNode;
  expandedContent: React.ReactNode;
  onStateChange?: (expanded: boolean) => void;
}

const TopSheet: React.FC<TopSheetProps> = ({ initialContent, expandedContent, onStateChange }) => {
  const { colors } = useTheme();
  const { top } = useSafeAreaInsets();
  const heightValue = useSharedValue(INITIAL_HEIGHT);
  const isExpanded = useSharedValue(false);
  const contextValue = useSharedValue({ startHeight: 0 });

  const triggerHaptic = React.useCallback(() => {
    requestAnimationFrame(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    });
  }, []);

  const notifyStateChange = React.useCallback(
    (expanded: boolean) => {
      if (onStateChange) {
        onStateChange(expanded);
      }
    },
    [onStateChange]
  );

  const gesture = Gesture.Pan()
    .onStart(() => {
      contextValue.value = { startHeight: heightValue.value };
    })
    .onUpdate((event) => {
      if (Math.abs(event.translationY) > GESTURE_THRESHOLD) {
        if (event.translationY > 0 && !isExpanded.value) {
          heightValue.value = withSpring(MAX_HEIGHT, { damping: 15 });
          isExpanded.value = true;
          runOnJS(triggerHaptic)();
          runOnJS(notifyStateChange)(true);
        } else if (event.translationY < 0 && isExpanded.value) {
          heightValue.value = withSpring(INITIAL_HEIGHT, { damping: 15 });
          isExpanded.value = false;
          runOnJS(triggerHaptic)();
          runOnJS(notifyStateChange)(false);
        }
      }
    })
    .onEnd(() => {
      heightValue.value = withSpring(isExpanded.value ? MAX_HEIGHT : INITIAL_HEIGHT, {
        damping: 15,
      });
    });

  const rTopSheetStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
    backgroundColor: colors.primary.black,
    paddingTop: top,
  }));

  const rInitialContentStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      heightValue.value,
      [INITIAL_HEIGHT, INITIAL_HEIGHT + 50],
      [1, 0],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      position: 'absolute',
      width: '100%',
      height: '100%',
    };
  });

  const rExpandedContentStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      heightValue.value,
      [INITIAL_HEIGHT, INITIAL_HEIGHT + 50],
      [0, 1],
      Extrapolate.CLAMP
    );

    const translateY = interpolate(
      heightValue.value,
      [INITIAL_HEIGHT, MAX_HEIGHT],
      [20, 0],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY }],
      position: 'absolute',
      width: '100%',
      height: '100%',
    };
  });

  return (
    <View style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.topSheetContainer, rTopSheetStyle]}>
          <View style={styles.content}>
            <Animated.View style={[styles.contentWrapper, rInitialContentStyle]}>
              {initialContent}
            </Animated.View>
            <Animated.View style={[styles.contentWrapper, rExpandedContentStyle]}>
              {expandedContent}
            </Animated.View>
          </View>
          <View style={styles.lineWrapper}>
            <View style={styles.line} />
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default TopSheet;
