import { View, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import { ChatMessage } from '../assets/mock';
import CustomText from './CustomText';
import { COLORS } from '../assets/variables/vars';
import Animated, {
  Extrapolate,
  Extrapolation,
  FadeInDown,
  interpolate,
  LinearTransition,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import TypingIndicator from './TypingIndicatory';
const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
function ChatItem({ data }: { data: ChatMessage }) {
  const isBot = data.sender === 'bot';

  return (
    <Animated.View
      entering={FadeInDown.duration(180)}
      style={[
        itemstyle.chatitem,
        isBot ? itemstyle.botAlign : itemstyle.userAlign,
      ]}
    >
      {isBot && (
        <View style={itemstyle.chatName}>
          <Image style={itemstyle.avatar} source={{ uri: data.avatar }} />
          <CustomText size="text_small">Bot</CustomText>
        </View>
      )}

      <View
        style={[
          itemstyle.chatMsg,
          isBot ? itemstyle.botBubble : itemstyle.userBubble,
        ]}
      >
        <CustomText size="text_small">{data.text}</CustomText>
      </View>
    </Animated.View>
  );
}

const Chat = ({
  messages,
  isTyping,
}: {
  messages: ChatMessage[];
  isTyping: boolean;
}) => {
  const listRef = React.useRef<FlatList>(null);

  React.useEffect(() => {
    listRef.current?.scrollToEnd({ animated: true });
  }, [messages.length]);

  return (
    <View style={chatstyle.parent}>
      <Animated.FlatList
        ref={listRef}
        scrollEventThrottle={16}
        decelerationRate="fast"
        data={messages}
        itemLayoutAnimation={LinearTransition.springify()
          .damping(80)
          .stiffness(200)}
        style={{ borderRadius: 8 }}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => <ChatItem data={item} />}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
        keyboardShouldPersistTaps="handled"
      />
      {isTyping && <TypingIndicator />}
    </View>
  );
};

const chatstyle = StyleSheet.create({
  parent: {
    paddingVertical: 10,
    flex: 1,
  },
});

const itemstyle = StyleSheet.create({
  chatitem: {
    marginBottom: 12,
  },

  userAlign: {
    alignItems: 'flex-end',
  },

  botAlign: {
    alignItems: 'flex-start',
  },

  chatName: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 4,
  },

  chatMsg: {
    padding: 10,
    borderRadius: 12,
    maxWidth: '75%',
  },

  botBubble: {
    backgroundColor: COLORS.color_selective,
    borderTopLeftRadius: 0,
  },

  userBubble: {
    backgroundColor: 'crimson',
    borderTopRightRadius: 0,
  },

  avatar: {
    height: 22,
    width: 22,
    borderRadius: 999,
  },
});

export default Chat;
