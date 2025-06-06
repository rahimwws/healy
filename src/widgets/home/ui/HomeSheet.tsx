import { Layout, Typography } from '@/shared/ui';
import Sheet from '@/shared/ui/Sheet/Sheet';
import BottomSheet, { BottomSheetFooter, BottomSheetFooterProps } from '@gorhom/bottom-sheet';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { BlurView } from 'expo-blur';
import { useTheme } from '@/shared/lib/theme';
import { Coach, Down, Heart, Moon, Step } from '@/shared/assets';

interface HomeSheetProps {
  onSheetChange: (isExpanded: boolean) => void;
  ref: React.RefObject<BottomSheet>;
}

export default function HomeSheet({ onSheetChange, ref: sheetRef }: HomeSheetProps) {
  const animatedPosition = useSharedValue(0);
  const animatedTop = useSharedValue(0);
  const { colors } = useTheme();
  const handleAnimate = useCallback(
    (from: number, to: number) => {
      if (to > 0.6) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        onSheetChange(true);
      } else {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        onSheetChange(false);
      }
    },
    [onSheetChange]
  );
  const renderFooter = useCallback(
    (props: BottomSheetFooterProps) => (
      <BottomSheetFooter {...props} bottomInset={0}>
        <BlurView intensity={5} tint="light" style={{ height: 10 }} />
      </BottomSheetFooter>
    ),
    []
  );
  return (
    <Sheet
      ref={sheetRef}
      sizes={['15%', '88%']}
      enableDynamicSizing={false}
      index={0}
      scrollViewProps={{
        contentInsetAdjustmentBehavior: 'automatic',
        showsVerticalScrollIndicator: false,
        contentContainerStyle: {
          paddingBottom: 50,
        },
        style: {
          marginTop: animatedTop,
        },
      }}
      animateOnMount={true}
      detached={true}
      onAnimate={handleAnimate}
      enablePanDownToClose={false}
      enableOverDrag={false}
      enableContentPanningGesture={true}
      enableHandlePanningGesture={true}
      animatedPosition={animatedPosition}
      footerComponent={renderFooter}>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 20,
          flex: 1,
          height: '100%',
          gap: 10,
        }}>
        <Typography size={20} font="semibold" bottom={2}>
          Daily Wellness Tracker
        </Typography>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 30,
            padding: 12,
            borderWidth: 1,
            borderColor: colors.primary.black + '10',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
          }}>
          {/* Header Row */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            {/* Icon with hearts */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              {/* Main heart icon */}
              <View>
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 28,
                    backgroundColor: '#FF7A6C',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {/* Heart SVG */}
                  <Heart fill={colors.primary.white} width={20} height={20} />
                </View>
              </View>
              {/* Title */}
              <Typography color="red" size={18} font="semibold">
                Heart rate
              </Typography>
            </View>

            {/* Current bpm */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Typography size={32} font="semibold">
                76
              </Typography>
              <Typography size={18} top={30}>
                bpm
              </Typography>
            </View>
          </View>

          {/* Min/Max Row */}
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              marginTop: 28,
              marginBottom: 12,
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
            }}>
            {/* Min */}
            <View
              style={{
                flex: 1,
                backgroundColor: '#F7F7F7',
                borderRadius: 24,
                padding: 15,
                alignItems: 'flex-start',
              }}>
              <Typography color="gray" size={16} font="semibold">
                Minimum
              </Typography>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Typography size={30} font="semibold">
                  98
                </Typography>
                <Typography color="gray" size={16} top={30}>
                  bpm
                </Typography>
              </View>
            </View>
            {/* Max */}
            <View
              style={{
                flex: 1,
                backgroundColor: '#F7F7F7',
                borderRadius: 24,
                padding: 15,

                alignItems: 'flex-start',
              }}>
              <Typography color="gray" size={16} font="semibold">
                Maximum
              </Typography>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Typography size={30} font="semibold">
                  98
                </Typography>
                <Typography color="gray" size={16} top={30}>
                  bpm
                </Typography>
              </View>
            </View>
          </View>

          {/* Good Heart Rate */}
          <Typography size={18} font="semibold">
            Good Heart rate
          </Typography>
          <Typography color="gray" size={16}>
            Your heart rate is good for now, keep going!
          </Typography>
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 30,
            padding: 12,
            borderWidth: 1,
            borderColor: colors.primary.black + '10',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
          }}>
          {/* Header Row */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            {/* Icon with hearts */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              {/* Main heart icon */}
              <View>
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 28,
                    backgroundColor: colors.primary.blue,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {/* Heart SVG */}
                  <Moon fill={colors.primary.white} width={20} height={20} />
                </View>
              </View>
              {/* Title */}
              <Typography color="blue" size={18} font="semibold">
                Asleep Time
              </Typography>
            </View>

            {/* Current bpm */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Typography size={32} font="semibold">
                8
              </Typography>
              <Typography size={18} top={49} color="gray">
                hr
              </Typography>
              <Typography size={32} font="semibold">
                29
              </Typography>
              <Typography size={18} top={35} color="gray">
                min
              </Typography>
            </View>
          </View>

          {/* Min/Max Row */}
          <View
            style={{
              width: '100%',
              marginTop: 28,
              marginBottom: 12,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.bg.light,
              paddingHorizontal: 10,
              paddingVertical: 15,
              gap: 5,
              borderRadius: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                gap: 4,
              }}>
              <View
                style={{
                  width: '20%',
                  height: 50,
                  backgroundColor: '#EAF0FD',
                  borderRadius: 15,
                }}></View>
              <View
                style={{
                  width: '25%',
                  height: 50,
                  backgroundColor: '#B2C8F7',
                  borderRadius: 15,
                }}></View>
              <View
                style={{
                  width: '40%',
                  height: 50,
                  backgroundColor: '#5B51F2',
                  borderRadius: 15,
                }}></View>
              <View
                style={{
                  width: '15%',
                  height: 50,
                  backgroundColor: '#3A2D7C',
                  borderRadius: 15,
                }}></View>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                justifyContent: 'space-between',
              }}>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Typography size={14} font="medium" color="gray">
                    Awake
                  </Typography>
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 20,
                      backgroundColor: '#EAF0FD',
                    }}></View>
                </View>
                <Typography font="semibold">39 m</Typography>
              </View>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Typography size={14} font="medium" color="gray">
                    REM
                  </Typography>
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 20,
                      backgroundColor: '#B2C8F7',
                    }}></View>
                </View>
                <Typography font="semibold">1h 42min</Typography>
              </View>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Typography size={14} font="medium" color="gray">
                    Core
                  </Typography>
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 20,
                      backgroundColor: '#5B51F2',
                    }}></View>
                </View>
                <Typography font="semibold">5h 28 mim</Typography>
              </View>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Typography size={14} font="medium" color="gray">
                    Deep
                  </Typography>
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 20,
                      backgroundColor: '#3A2D7C',
                    }}></View>
                </View>
                <Typography font="semibold">1 h</Typography>
              </View>
            </View>
          </View>

          <Typography size={18} font="semibold">
            You had enough rest today.
          </Typography>
          <Typography color="gray" size={16}>
            You can enjoy your day and achieve you goals.
          </Typography>
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 30,
            padding: 12,
            borderWidth: 1,
            borderColor: colors.primary.black + '10',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
          }}>
          {/* Header Row */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            {/* Icon with hearts */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              {/* Main heart icon */}
              <View>
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 28,
                    backgroundColor: colors.primary.green,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {/* Heart SVG */}
                  <Step fill={colors.primary.white} width={18} height={18} />
                </View>
              </View>
              {/* Title */}
              <Typography color="green" size={18} font="semibold">
                Steps
              </Typography>
            </View>

            {/* Current bpm */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Typography size={26} font="semibold">
                1 100
              </Typography>
              <Typography size={18} top={15} color="gray">
                steps
              </Typography>
              <View
                style={{
                  width: 2,
                  height: 25,
                  borderRadius: 20,
                  marginHorizontal: 4,
                  backgroundColor: colors.primary.lightGray,
                }}
              />
              <Typography size={26} font="semibold">
                2.56
              </Typography>
              <Typography size={18} top={15} color="gray">
                km
              </Typography>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
              marginVertical: 10,
              justifyContent: 'space-between',
            }}>
            <Typography size={18} font="medium" color="gray">
              Goal
            </Typography>
            <Typography size={18} font="medium">
              1 500 steps | 10 km
            </Typography>
          </View>
          <View
            style={{
              width: '100%',
              height: 5,
              backgroundColor: colors.primary.lightGray,
              borderRadius: 20,
              marginBottom: 10,
            }}>
            <View
              style={{
                width: '80%',
                height: 5,
                backgroundColor: colors.primary.green,
                borderRadius: 20,
              }}
            />
          </View>
          <Typography size={20} font="semibold">
            You had enough rest today.
          </Typography>
          <Typography color="gray" size={16}>
            You can enjoy your day and achieve you goals.
          </Typography>
        </View>
      </View>
    </Sheet>
  );
}
