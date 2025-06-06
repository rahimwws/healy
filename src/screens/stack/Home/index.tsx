import { DownArrow, Fire, Heart, Moon, Step, Tasks } from '@/shared/assets';
import { Layout, Typography } from '@/shared/ui';
import { Image, TouchableOpacity, View } from 'react-native';
import React, { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useAppNavigation } from '@/shared/lib/navigation';
import { HomeSheet } from '@/widgets/home';
import { useTheme } from '@/shared/lib/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import BottomSheet from '@gorhom/bottom-sheet';

const LazyParticles = React.lazy(() =>
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  Promise.resolve({ default: require('@/shared/assets/animation/Particles').default })
) as React.LazyExoticComponent<React.ComponentType<{ open?: boolean; title?: string }>>;

const FullContent = () => {
  const navigation = useAppNavigation();
  return (
    <View style={{ marginBottom: 32, alignItems: 'center' }}>
      <Typography color="gray" size={25} align="left" font="semibold">
        Good morning Murat. Your wellness is good and you have{' '}
        <Typography color="white" size={25} align="left" font="semibold" icon={<Tasks />}>
          3 tasks
        </Typography>{' '}
        <Typography color="gray" size={25} align="left" font="semibold">
          for today.
        </Typography>
      </Typography>
      <TouchableOpacity
        style={{ height: 300, marginTop: 20 }}
        onPress={() => {
          navigation.navigate('HomeStack', {
            screen: 'CHAT',
          });
        }}>
        <Suspense fallback={null}>
          <LazyParticles open={false} title="Chat with Healy" />
        </Suspense>
      </TouchableOpacity>
    </View>
  );
};

const AnimatedHeader = ({ isExpanded }: { isExpanded: boolean }) => {
  const expandedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isExpanded ? 0 : 1, { duration: 100 }),
      transform: [
        {
          translateY: withSpring(isExpanded ? -30 : 0, {
            damping: 15,
            stiffness: 100,
          }),
        },
      ],
    };
  }, [isExpanded]);

  const collapsedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isExpanded ? 1 : 0, { duration: 100 }),
      transform: [
        {
          translateY: withSpring(isExpanded ? 0 : 50, {
            damping: 15,
            stiffness: 100,
          }),
        },
      ],
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    };
  }, [isExpanded]);

  return (
    <View style={{ height: 50, width: '100%', marginBottom: 24 }}>
      <Animated.View style={expandedStyle}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '100%',
          }}>
          <Typography color="white" size={32} align="left" font="bold">
            Monday
          </Typography>
          <View style={{ alignItems: 'flex-end' }}>
            <Typography color="white" size={18} align="left" font="semibold">
              April 17
            </Typography>
            <Typography color="gray" size={18} align="right" font="semibold">
              2025
            </Typography>
          </View>
        </View>
      </Animated.View>

      <Animated.View style={collapsedStyle}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            gap: 4,
          }}>
          <Typography color="white" size={20} align="left" font="semibold">
            Monday, 17 Apr 2025
          </Typography>
          <DownArrow />
        </View>
      </Animated.View>
    </View>
  );
};

export default function Home() {
  const { colors } = useTheme();
  const { top } = useSafeAreaInsets();
  const [isExpanded, setIsExpanded] = useState(false);
  const sheetRef = useRef<BottomSheet>(null);
  useLayoutEffect(() => {
    if (sheetRef.current) {
      sheetRef.current.expand();
    }
  }, []);
  return (
    <Layout pt={0} px={0}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: colors.primary.black,
          paddingTop: top,
          paddingHorizontal: 20,
        }}>
        <AnimatedHeader isExpanded={isExpanded} />
        <FullContent />
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            top: '-5%',
          }}>
          <Image
            source={require('@/shared/assets/images/home_bg.png')}
            style={{
              width: 250,
              height: 200,
              position: 'absolute',
              top: '-20%',
            }}
            resizeMode="contain"
          />
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 50,
              marginBottom: 20,
            }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', height: 40 }}>
              <View
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  width: 30,
                  height: 30,
                  alignItems: 'center',
                }}>
                <Heart />
              </View>

              <Typography color="red" align="left" font="semibold">
                Heart
              </Typography>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', height: 40 }}>
              <View
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  width: 30,
                  height: 30,
                  alignItems: 'center',
                }}>
                <Moon fill={colors.primary.blue} />
              </View>

              <Typography color="blue" align="left" font="semibold">
                Sleep
              </Typography>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', height: 40 }}>
              <View
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  width: 30,
                  height: 30,
                  alignItems: 'center',
                }}>
                <Fire />
              </View>
              <Typography color="orange" align="left" font="semibold">
                Calories
              </Typography>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', height: 40 }}>
              <View
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  width: 30,
                  height: 30,
                  alignItems: 'center',
                }}>
                <Step />
              </View>
              <Typography color="green" align="left" font="semibold">
                Steps
              </Typography>
            </View>
          </View>
        </View>
      </View>
      <HomeSheet onSheetChange={setIsExpanded} ref={sheetRef as React.RefObject<BottomSheet>} />
    </Layout>
  );
}
