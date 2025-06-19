import { View, useWindowDimensions } from 'react-native'
import { ReactNode, useMemo } from 'react'
import { useTheme } from '@/shared/lib/theme';
import getStyles from './styles';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Typography } from '@/shared/ui';

type Props = {
  onSheetChange: (isExpanded: boolean) => void;
  children: ReactNode
}

const HomeSheet = ({ onSheetChange, children }: Props) => {
  const { colors, theme } = useTheme();
  const styles = useMemo(() => getStyles(colors), [theme]);
  const { height: screenHeight } = useWindowDimensions();

  const VISIBLE_POSITION = screenHeight * 0.37;
  const HIDDEN_POSITION = screenHeight + screenHeight * 0.11;
  const translateY = useSharedValue(HIDDEN_POSITION);

  const handleAnimate = (value: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    onSheetChange(value);
  };

  const panGesture = Gesture.Pan()
    .onChange((event) => {
      translateY.value += event.changeY;
      if (translateY.value < VISIBLE_POSITION) translateY.value = VISIBLE_POSITION;
      if (translateY.value > HIDDEN_POSITION) translateY.value = HIDDEN_POSITION;
    })
    .onEnd((event) => {
      const threshold = screenHeight * 0.05;
      const deltaY = event.translationY;

      const pulledUpEnough = deltaY < -threshold;
      const pulledDownEnough = deltaY > threshold;

      if (pulledUpEnough) {
        translateY.value = withTiming(VISIBLE_POSITION);
        runOnJS(handleAnimate)(true);
      } else if (pulledDownEnough) {
        translateY.value = withTiming(HIDDEN_POSITION);
        runOnJS(handleAnimate)(false);
      } else {
        const midpoint = (HIDDEN_POSITION + VISIBLE_POSITION) / 2;
        const shouldExpand = translateY.value < midpoint;
        translateY.value = withTiming(
          shouldExpand ? VISIBLE_POSITION : HIDDEN_POSITION
        );
        runOnJS(handleAnimate)(shouldExpand);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {/* Top drag handle area */}
      <GestureDetector gesture={panGesture}>
        <View style={styles.topHandleArea}>
          <View style={styles.topBorderWrap}>
            <View style={styles.topBorder} />
          </View>
          <Typography size={20} font="semibold" top={3} align='left'>
            Daily Wellness Tracker
          </Typography>
        </View>
      </GestureDetector>

      {/* Scrollable content area */}
      <Animated.ScrollView
        bounces={false}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={styles.containerInner}
        contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
      >
        {children}
      </Animated.ScrollView>
    </Animated.View>
  )
}

export default HomeSheet