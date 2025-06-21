import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  AnimatedText,
  Clipboard,
  ClipboardWithCross,
  Close,
  GradientBackground,
  Particles,
  Settings,
  UserAnimatedText,
} from '@/shared/assets';
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from 'expo-speech-recognition';
import { useAppNavigation } from '@/shared/lib/navigation';
import { Typography } from '@/shared/ui';
import { ConversationItemT, MessageItem } from '@/entities/Chat';

export default function Chat() {
  const navigation = useAppNavigation();
  const { bottom, top } = useSafeAreaInsets();
  const [transcript, setTranscript] = useState('');
  const [volume, setVolume] = useState(0);
  const [recognizing, setRecognizing] = useState(false);
  const [conversation, setConversation] = useState<ConversationItemT[]>([]);
  const flatlistRef = useRef<FlatList>(null);

  useSpeechRecognitionEvent("start", () => setRecognizing(true));
  useSpeechRecognitionEvent("end", () => stopRecognizing());
  useSpeechRecognitionEvent('result', (event) => {
    const newTranscript = event.results[0]?.transcript;
    if (newTranscript) {
      setTranscript(newTranscript);
    }
    flatlistRef.current?.scrollToEnd({ animated: true });

    if (event.isFinal) {
      setConversation(prev => [...prev, {
        id: Date.now(),
        who: 'You',
        text: transcript,
      }]);
      stopRecognizing();
    }
  });

  useSpeechRecognitionEvent('volumechange', (event) => {
    setVolume(event.value);
  });

  useSpeechRecognitionEvent('error', (event) => {
    console.log('error code:', event.error, 'error message:', event.message);
  });

  const stopRecognizing = () => {
    setRecognizing(false);
    setTranscript('');
  }

  const handleStart = useCallback(async () => {
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      console.warn('Permissions not granted', result);
      return;
    }
    try {
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

  const handleStop = () => {
    stopRecognizing();
    ExpoSpeechRecognitionModule.stop();
  }

  useEffect(() => {
    if (!recognizing)
      ExpoSpeechRecognitionModule.stop();
  }, [recognizing]);

  const renderItem = useCallback((item: ConversationItemT) => {
    return (
      <View style={{ marginBottom: 10, }}>
        <MessageItem
          who={item.who}
          text={item.text}
        />
      </View>
    )
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', height: '50%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }} pointerEvents='none'>
          <Particles quantity={350} />
        </View>
        <TouchableOpacity style={[styles.settingsButton, { top: top + 10 }]}>
          <Settings />
        </TouchableOpacity>
      </View>
      {
        !conversation.length &&
        <AnimatedText text={"Hello Your, I'm your AI Assistant"} role="Healy" />
      }
      <View style={{ height: '40%' }}>
        <FlatList
          ref={flatlistRef}
          contentContainerStyle={styles.containerInner}
          style={{
            position: 'relative',
            zIndex: 10,
            marginBottom: 5,
          }}
          data={conversation}
          keyExtractor={(item, i) => item.id?.toString() || i?.toString()}
          renderItem={({ item, }) => renderItem(item)}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <>
              {
                recognizing &&
                <MessageItem
                  who={"You"}
                  text={transcript}
                />
              }
            </>
          }
        />
      </View>

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
            style={styles.gradientBorder}
          >
            <View style={styles.buttonInner}>
              <Close />
            </View>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={recognizing ? handleStop : handleStart}
        >
          <LinearGradient
            colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.08)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBorder}>
            <View style={styles.buttonInner}>
              {
                recognizing ?
                  <ClipboardWithCross width={30} height={30} />
                  :
                  <Clipboard width={30} height={30} />
              }
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <GradientBackground volume={volume} />
      {/* <AnimatedText text={currentText} role="Healy" /> */}


    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  containerInner: {
    paddingBottom: 20,
    paddingHorizontal: 20,
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
