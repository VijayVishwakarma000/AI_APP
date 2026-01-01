import { View, Text, Platform, Keyboard, Animated, Button } from 'react-native';
import React, { FC, ReactNode, Ref, RefObject, useRef, useState } from 'react';
import PromptField from '../components/PromptField';
import { ChatMessage, chatMessages } from '../assets/mock';
import Chat from '../components/Chat';
import GirlfriendsBottomSheet, { BottomSheetHandle } from '../components/GirlfriendsBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

const ChatContext = ({ selectedTitle,children,sheetRef }: {selectedTitle:string, children: ReactNode,sheetRef: RefObject<BottomSheetHandle> }) => {
  const keyboardOffset = useRef(new Animated.Value(0)).current;
  const [isTyping, setIsTyping] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState(chatMessages);
  React.useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      e => {
        Animated.timing(keyboardOffset, {
          toValue: e.endCoordinates.height,
          duration: Platform.OS === 'ios' ? e.duration : 250,
          useNativeDriver: true,
        }).start();
      },
    );

    const hideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        Animated.timing(keyboardOffset, {
          toValue: 0,
          duration: Platform.OS === 'ios' ? 200 : 250,
          useNativeDriver: true,
        }).start();
      },
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);
  function sendMessages() {
    keyboardOffset.setValue(0);
    Keyboard.dismiss();
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: prompt,
      avatar: 'https://picsum.photos/seed/user-1/200/200',
      createdAt: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMsg]);
    setPrompt('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'bot',
          text: 'I’m here… tell me more 🤍',
          avatar: 'https://picsum.photos/seed/ai-gf-typing/200/200',
          createdAt: new Date().toISOString(),
        },
      ]);
      setIsTyping(false);
    }, 1200);
  }
  return (
    <>
   
      {messages.length > 0 ? (
        <Chat isTyping={isTyping} messages={messages} />
      ) : (
        children
      )}

      <Animated.View
        style={{
          transform: [{ translateY: Animated.multiply(keyboardOffset, -1) }],
        }}
      >
        <PromptField
          prompt={prompt}
          setPrompt={setPrompt}
          openBots={() => {
            sheetRef.current?.open();
          }}
          selectedTitle={selectedTitle}
          sendMessages={sendMessages}
        />
   
      </Animated.View>
          
    </>
  );
};

export default ChatContext;
