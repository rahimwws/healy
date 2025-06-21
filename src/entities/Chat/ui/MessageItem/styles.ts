import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'medium',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  user: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'bold',
  },
  userDot: {
    width: 25,
    height: 1.5,
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
  },
});

export default styles;