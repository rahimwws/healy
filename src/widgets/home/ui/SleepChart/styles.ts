import { ColorsT } from "@/shared/lib/theme";
import { StyleSheet } from "react-native";

const getStyles = (colors: ColorsT) => StyleSheet.create({
  chartWrap: {
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
  },
  chartTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 4,
  },
  chartBottom: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    justifyContent: 'space-between',
  },
  chartBarItem: {
    height: 45,
    borderRadius: 13,
  },
  chartBottomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 20,
  },
});

export default getStyles;