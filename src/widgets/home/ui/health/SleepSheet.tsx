import { Heart } from '@/shared/assets/interface/health/Heart';
import { Moon } from '@/shared/assets/interface/health/Moon';
import { useTheme } from '@/shared/lib/theme';
import { BottomSheet, Typography } from '@/shared/ui';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { TouchableOpacity, View } from 'react-native';

export default function SleepSheet() {
  const { colors } = useTheme();
  return (
    <BottomSheet sizes={['medium']} cornerRadius={0} name="sleep-sheet">
      <View
        style={{
          flex: 1,
          backgroundColor: colors.primary.white,
          paddingHorizontal: 20,
          paddingTop: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              backgroundColor: colors.primary.black + '10',
              width: 42,
              borderRadius: 8,
              alignItems: 'center',
            }}>
            <Typography size={14} font="medium" color="gray">
              W
            </Typography>
            <View
              style={{
                width: '100%',
                height: 20,
                backgroundColor: colors.primary.red,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Typography font="medium" color="white">
                27
              </Typography>
            </View>
          </View>
          <Typography size={22} font="semibold">
            Sleep
          </Typography>
          <View
            style={{
              width: 42,
              height: 42,
              borderRadius: 28,
              backgroundColor: colors.primary.blue,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {/* Heart SVG */}
            <Moon fill={colors.primary.white} width={25} height={25} />
          </View>
        </View>
        <View style={{ marginTop: 10, alignItems: 'center' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              gap: 4,
            }}>
            <Typography size={40} font="semibold" color="black">
              8
            </Typography>
            <Typography size={20} font="semibold" bottom={20} color="gray">
              hr
            </Typography>
            <Typography size={40} font="semibold" color="black">
              27
            </Typography>
            <Typography size={20} font="semibold" color="gray" bottom={10}>
              min
            </Typography>
          </View>

          <Typography size={18} font="semibold" color="blue" top={3}>
            Rahim, this is your perfect sleep
          </Typography>
        </View>
        {/* Sleep chart */}
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
                height: 45,
                backgroundColor: '#EAF0FD',
                borderRadius: 13,
              }}></View>
            <View
              style={{
                width: '25%',
                height: 45,
                backgroundColor: '#B2C8F7',
                borderRadius: 13,
              }}></View>
            <View
              style={{
                width: '40%',
                height: 45,
                backgroundColor: '#5B51F2',
                borderRadius: 13,
              }}></View>
            <View
              style={{
                width: '15%',
                height: 45,
                backgroundColor: '#3A2D7C',
                borderRadius: 13,
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            position: 'absolute',
            bottom: 10,
            left: 0,
            right: 0,
            paddingHorizontal: 20,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              TrueSheet.dismiss('sleep-sheet');
            }}
            style={{
              backgroundColor: colors.primary.black,
              paddingVertical: 20,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
            }}>
            <Typography size={18} font="semibold" color="white">
              talk with healy
            </Typography>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
}
