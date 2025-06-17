import { ColorsT } from "@/shared/lib/theme";
import { StyleSheet } from "react-native";

const getStyles = (colors: ColorsT) => StyleSheet.create({
  container: {
    width: '100%',
    height: 5,
    backgroundColor: colors.primary.lightGray,
    borderRadius: 20,
    marginBottom: 10,
  },
  line: {
    height: 5,
    backgroundColor: colors.primary.green,
    borderRadius: 20,
  }
});

export default getStyles;