import React, { useState, useEffect, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  AnimatedText,
  Clipboard,
  Close,
  GradientBackground,
  Particles,
  Settings,
  UserAnimatedText,
} from '@/shared/assets';
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from 'expo-speech-recognition';
import { useAppNavigation } from '@/shared/lib/navigation';

export default function Chat() {
  const navigation = useAppNavigation();
  const { bottom, top } = useSafeAreaInsets();
  const [currentText] = useState("Hello Your, I'm your AI Assistant");
  const [transcript, setTranscript] = useState('');
  const [volume, setVolume] = useState(0);
  const [speechFinished, setSpeechFinished] = useState(false);
  useSpeechRecognitionEvent('result', (event) => {
    const newTranscript = event.results[0]?.transcript;
    if (newTranscript) {
      setTranscript(newTranscript);
    }
    if (event.isFinal) {
      setSpeechFinished(true);
    }
  });

  useSpeechRecognitionEvent('volumechange', (event) => {
    setVolume(event.value);
  });

  useSpeechRecognitionEvent('error', (event) => {
    console.log('error code:', event.error, 'error message:', event.message);
  });

  const handleStart = useCallback(async () => {
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      console.warn('Permissions not granted', result);
      return;
    }
    try {
      ExpoSpeechRecognitionModule.stop();
      ExpoSpeechRecognitionModule.start({
        lang: 'ru-RU',
        interimResults: true,
        continuous: true,
        volumeChangeEventOptions: {
          enabled: true,
          intervalMillis: 100,
        },
      });
    } catch (error) {
      console.error('Error starting speech recognition:', error);
    }
  }, []);

  useEffect(() => {
    handleStart();
  }, [handleStart]);

  return (
    <View style={[styles.container]}>
      <Particles quantity={350} />
      <TouchableOpacity style={[styles.settingsButton, { top: top + 10 }]}>
        <Settings />
      </TouchableOpacity>
      <AnimatedText text={currentText} role="Healy" />

      <UserAnimatedText text={transcript} isFinished={speechFinished} />
      <View style={[styles.buttonContainer, { bottom: bottom + 10 }]}>
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() => {
            ExpoSpeechRecognitionModule.stop();
            setVolume(0);
            navigation.goBack();
          }}>
          <LinearGradient
            colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.08)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBorder}>
            <View style={styles.buttonInner}>
              <Close />
            </View>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonWrapper} onPress={handleStart}>
          <LinearGradient
            colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.08)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBorder}>
            <View style={styles.buttonInner}>
              <Clipboard width={30} height={30} />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <GradientBackground volume={volume} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsButton: {
    position: 'absolute',
    right: 20,
    zIndex: 10,
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    left: 0,
    right: 0,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    zIndex: 10,
  },
  buttonWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientBorder: {
    width: 70,
    height: 70,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonInner: {
    width: 69,
    height: 69,
    borderRadius: 33.5,
    backgroundColor: '#262626',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
