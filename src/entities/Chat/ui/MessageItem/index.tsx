import { View, Text, ViewStyle, TextStyle } from 'react-native';
import styles from './styles';

interface Props {
  /** @default Healy */
  who?: "Healy" | "You"
  text: string;
  containerStyle?: ViewStyle
  textStyle?: TextStyle
}
const MessageItem = (props: Props) => {
  const {
    who = 'Healy',
    text,
    containerStyle,
    textStyle
  } = props;

  if (!text || text.trim() === '') return null;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.userContainer}>
        <View style={styles.userDot} />
        <Text style={[styles.user, textStyle]}>{who}</Text>
        <View style={styles.userDot} />
      </View>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  );
}

export default MessageItem;