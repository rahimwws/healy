import { GroupSvg } from '@/shared/assets';
import { useTheme } from '@/shared/lib/theme';
import { Layout, Typography } from '@/shared/ui';
import { ScrollView, View } from 'react-native';

export default function Group() {
  const { colors } = useTheme();
  return (
    <Layout>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <Typography size={20} font="semibold">
          Care Groups
        </Typography>
        <View
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            alignSelf: 'center',
            borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: '#E0E0E0',
            borderStyle: 'dashed',
          }}>
          <GroupSvg fill={colors.primary.lightGray} width={30} height={30} />
          <Typography size={18} font="medium" color="lightGray">
            New Group
          </Typography>
        </View>
      </ScrollView>
    </Layout>
  );
}
