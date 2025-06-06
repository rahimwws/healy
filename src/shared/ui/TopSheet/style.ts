import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  topSheetContainer: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingHorizontal: 20,
    width: '100%',
  },
  content: {
    flex: 1,
    overflow: 'hidden',
  },
  contentWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineWrapper: {
    width: '100%',
    height: 40,
    justifyContent: 'flex-end',
    paddingBottom: 15,
  },
  line: {
    width: 50,
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    alignSelf: 'center',
  },
});
