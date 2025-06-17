import { ColorsT } from "@/shared/lib/theme";
import { StyleSheet } from "react-native";

const getStyles = (colors: ColorsT) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.white,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headDateWrap: {
    backgroundColor: colors.primary.black + '10',
    width: 42,
    borderRadius: 8,
    alignItems: 'center',
  },
  headDate: {
    width: '100%',
    height: 20,
    backgroundColor: colors.primary.red,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moonWrap: {
    width: 42,
    height: 42,
    borderRadius: 28,
    backgroundColor: colors.primary.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sleepTime: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  bottomActions: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    marginHorizontal: 20,
  },
  bottomBtn: {
    backgroundColor: colors.primary.black,
    paddingVertical: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  }
});

export default getStyles;