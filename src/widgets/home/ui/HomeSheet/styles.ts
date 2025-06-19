import { ColorsT } from '@/shared/lib/theme';
import { StyleSheet } from 'react-native';

const getStyles = (colors: ColorsT) =>
  StyleSheet.create({
    heartRateWrap: {
      flexDirection: 'row',
      width: '100%',
      marginTop: 28,
      marginBottom: 12,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
    },
    itemWrap: {
      backgroundColor: '#fff',
      borderRadius: 30,
      padding: 12,
      borderWidth: 1,
      borderColor: colors.primary.black + '10',
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: '100%',
      marginBottom: 5,
    },
    headRow: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'space-between',
    },
    iconWrap: {
      width: 32,
      height: 32,
      borderRadius: 28,
      alignItems: 'center',
      justifyContent: 'center',
    },
    stepsCurrent: {
      width: 2,
      height: 25,
      borderRadius: 20,
      marginHorizontal: 4,
      backgroundColor: colors.primary.lightGray,
    },
    goal: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginVertical: 10,
      justifyContent: 'space-between',
    },
  });

export default getStyles;
