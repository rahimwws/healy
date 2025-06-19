import { ColorsT } from "@/shared/lib/theme";
import { StyleSheet } from "react-native";

const getStyles = (colors: ColorsT) => StyleSheet.create({
  
  container: {
    position: 'absolute',
    bottom: '38%',
    backgroundColor: colors.primary.white,
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
    width: '100%',
    height: '91%',
    alignItems:'center',
  },
  containerInner: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  topHandleArea: {
    paddingHorizontal: 20,
    width: '100%',
    paddingTop: 10,
    paddingBottom: 15,
  },
  topBorderWrap: {
    alignItems:'center'
  },
  topBorder: {
    backgroundColor: colors.primary.lightGray,
    borderRadius: 100,
    width: 50,
    height: 4,
  },
});

export default getStyles;