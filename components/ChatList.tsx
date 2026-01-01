import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import CustomText from './CustomText';
import { COLORS } from '../assets/variables/vars';
import { Trash } from 'lucide-react-native';
import { ChatMessage, chatMessages } from '../assets/mock';
import NoChatsFound from './NoChatsFound';

const ChatItem = ({ active, data }: { active: boolean; data: ChatMessage }) => {
  return (
    <View
      style={[
        {
          backgroundColor: active ? COLORS.color_primary : 'transparent',
          borderWidth: active ? 0 : 0,
        },
        itemstyle.chatitem,
      ]}
    >
      <Image style={itemstyle.avatar} source={{ uri: data.avatar }} />
      <CustomText style={{ flexGrow: 1 }} size="text_small">
        Clancy Smith
      </CustomText>
      {active && <Trash size={18} color={'crimson'} />}
    </View>
  );
};

const itemstyle = StyleSheet.create({
  chatitem: {
    flexDirection: 'row',
    gap: 8,
    padding: 10,
    borderRadius: 10,
    marginBottom: 4,
    alignItems: 'center',
  },

  avatar: {
    height: 22,
    width: 22,
    resizeMode: 'cover',
    borderRadius: 1000,
  },
});

const ChatList = () => {
  const [selectedChat, setselectedChat] = useState(chatMessages[0]);
  return (
    <View style={styles.list}>
      <FlatList
        data={chatMessages}
        keyExtractor={item => item.id}
        extraData={selectedChat.id}
        scrollEventThrottle={16}
        removeClippedSubviews={false}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<NoChatsFound/>}
        renderItem={({ item, index }) => {
          return (
            <Pressable
              style={{ width: '100%' }}
              onPress={() => setselectedChat(item)}
            >
              <ChatItem active={selectedChat.id == item.id} data={item} />
            </Pressable>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingVertical: 10,
    height: Dimensions.get('screen').height - 420,
  },
});

export default ChatList;
