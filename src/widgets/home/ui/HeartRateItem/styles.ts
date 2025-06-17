import { ColorsT } from "@/shared/lib/theme";
import { StyleSheet } from "react-native";

const getStyles = (colors: ColorsT) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    borderRadius: 24,
    padding: 15,
    alignItems: 'flex-start',
  }
});

export default getStyles;