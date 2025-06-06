import * as Haptics from 'expo-haptics';
export const SoftTouch = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
};
export const MediumTouch = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
};
