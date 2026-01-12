import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  Animated,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Button,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { COLORS } from '../assets/variables/vars';
import CustomText from '../components/CustomText';
const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
import {
  ChevronRightIcon,
  Clapperboard,
  ImageIcon,
  Layers,
  Minus,
  Plus,
  RectangleVertical,
  Sparkle,
} from 'lucide-react-native';
import PromptField from '../components/PromptField';
import CustomButton from '../assets/CustomButton';
import ImageStack from '../components/ImageStack';
import Sidebar from '../components/Sidebar';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useDrawerStatus } from '@react-navigation/drawer';
import ChatContext from '../hooks/ChatContext';
import GirlfriendsBottomSheet, {
  BottomSheetHandle,
} from '../components/GirlfriendsBottomSheet';
import BottomSheet, { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import {
  BottomSheetMethods,
  BottomSheetModalMethods,
} from '@gorhom/bottom-sheet/lib/typescript/types';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GirlfriendsBottomSheetModal from '../components/GirlfriendsBottomSheet';

let options = [
  {
    title: 'Image',
    icon: ImageIcon,
  },
  {
    title: 'Video',
    icon: Clapperboard,
  },
  // {
  //   title: 'AI Tools',
  //   icon: Sparkle,
  // },
];
const bots = [
  {
    title: "Clara",
    description:
      "hardcore submissive focused on heavy degradation, humiliation, and non-con fantasies.",
  },

  {
    title: "Trixie",
 
    description:
      "lobotomized bimbo with plastic tits and zero iq, existing solely to be used as a fuck-doll.",
  },

  {
    title: "Raven",
  
    description:
      "goth exhibitionist and public cum dump into gangbangs, sharing, and cuckquean scenarios.",
  },

  {
    title: "Chloe",
   
    description:
      "insatiable nympho neighbor with zero self-control, addicted to rough, secret hookups.",
  },

  {
    title: "Jade",
   
    description:
      "extreme pain slut and masochist who requires violence and breathplay to feel pleasure.",
  },
  {
    title: "Maya",
    description:
      "the soulmate. focuses on deep emotional bonding, vanilla romance, and pure affection.",
  },

  {
    title: "Elena",
    description:
      "stress-relief tradwife. maternal energy, domestic service, and soft, comforting intimacy.",
  },

  {
    title: "Sophie",
    
    description:
      "the innocent student. shy, inexperienced, and looking for a gentle hero to guide her.",
  },

  {
    title: "Isabella",

    description:
      "obsessive romantic. fiery, possessive, and focused on intense spiritual connection and tantra.",
  },
];

function ImageCounter() {
  const ImageCounterStyle = StyleSheet.create({
    btn: {
      backgroundColor: COLORS.color_selective,
      padding: 14,
      borderRadius: 14,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: WIDTH / 2.22,
    },
  });
  const [count, setcount] = useState(12);

  return (
    <View style={ImageCounterStyle.btn}>
      <Layers size={25} color={COLORS.color_secondary} />
      <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
        <Minus
          onPress={() => setcount(x => (x != 1 ? x - 1 : 1))}
          size={20}
          color={COLORS.color_tertiary}
        />
        <CustomText style={{ fontWeight: 'bold', fontSize: 18 }}>
          {count}
        </CustomText>
        <Plus
          onPress={() => setcount(x => x + 1)}
          size={20}
          color={COLORS.color_tertiary}
        />
      </View>
    </View>
  );
}
function ImageRatio() {
  const ImageCounterStyle = StyleSheet.create({
    btn: {
      backgroundColor: COLORS.color_selective,
      padding: 14,
      borderRadius: 14,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: WIDTH / 2.22,
    },
  });

  return (
    <View style={ImageCounterStyle.btn}>
      <RectangleVertical size={30} color={COLORS.color_secondary} />
      <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
        <CustomText style={{ fontWeight: 'bold', fontSize: 18 }}>
          9:16
        </CustomText>
        <ChevronRightIcon size={20} color={COLORS.color_tertiary} />
      </View>
    </View>
  );
}

type CharacterType = {
  title: string;
  description: string;
};
const Home = () => {
  const sheetRef = useRef<BottomSheetHandle>(null);
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const isDrawerOpen = useDrawerStatus() === 'open';
  const animation = useRef(new Animated.Value(0)).current;

  const barOffset = 5;

  const rotateTop = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const rotateBottom = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-45deg'],
  });

  const translateYTop = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 4],
  });

  const translateYBottom = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -6],
  });

  // const toggleMenu = () => {
  //   Animated.timing(animation, {
  //     toValue: open ? 0 : 1,
  //     duration: 260,
  //     useNativeDriver: true,
  //   }).start();

  //   setOpen(prev => {

  //     return !prev
  //   });

  // };
  const toggleMenu = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

    const [data, setData] = useState<CharacterType[]>([]);
    const [selectedTitle, setSelectedTitle] = useState<string>("");

    /* ---------- FETCH ---------- */
    const fetchCharacters = useCallback(async () => {
      // const res = await fetch('http://192.168.29.97:3000/api/characters');
      // const json = await res.json();
      setData(bots);
      setSelectedTitle(bots[0].title)
    }, []);

    useEffect(() => {
      fetchCharacters();
    }, [fetchCharacters]);


  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: isDrawerOpen ? 1 : 0,
      duration: 260,
      useNativeDriver: true,
    }).start();
    setOpen(isDrawerOpen);
  }, [isDrawerOpen]);

  // const [activeOption, setactiveOption] = useState(options[0].title);

  return (
          <GestureHandlerRootView style={{flex:1}}>
   
    <View style={styles.body}>
      {/* <Sidebar open={open} setOpen={setOpen} /> */}
        <GirlfriendsBottomSheet
          ref={sheetRef}
          data={data}
          selectedTitle={selectedTitle}
          setSelectedTitle={setSelectedTitle}
          onSelect={bot => {
            console.log(bot);
            sheetRef.current?.close();
          }}
        />
 
      <View style={styles.topbar}>
        <View style={styles.logo}>
          <Image
            style={styles.logoimg}
            source={require('../assets/icon.png')}
          />
          <CustomText  size="text_large">{selectedTitle.toUpperCase()}</CustomText>
        </View>

        <Pressable onPress={toggleMenu} style={styles.menuButton}>
          {/* TOP BAR (40px) */}
          <Animated.View
            style={[
              {
                marginLeft: 7,
                marginBottom: open ? 20 : 20,
                ...styles.barLarge,
              },
              {
                transform: [
                  { translateY: translateYTop },
                  { rotate: rotateTop },
                ],
              },
            ]}
          />

          {/* BOTTOM BAR (30px) */}
          <Animated.View
            style={[
              { width: open ? 30 : 20, ...styles.barSmall },
              {
                transform: [
                  { translateX: barOffset },
                  { translateY: translateYBottom },
                  { rotate: rotateBottom },
                ],
              },
            ]}
          />
        </Pressable>
      </View>
      {/* <View style={styles.options}>
        {options.map(item => {
          const isActive = activeOption === item.title;

          return (
            <Pressable
              key={item.title}
              onPress={() => setactiveOption(item.title)}
              style={isActive ? styles.optbtnactive : styles.optbtn}
            >
              <item.icon
                size={25}
                color={
                  isActive ? COLORS.color_primary : COLORS.color_secondary
                }
              />

              <CustomText
                size="text_small"
                style={{
                  fontWeight: '700',
                  color: isActive
                    ? COLORS.color_primary
                    : COLORS.color_secondary,
                }}
              >
                {item.title}
              </CustomText>
            </Pressable>
          );
        })}
      </View> */}

      <View style={styles.chatparent}>
        <ChatContext selectedTitle={selectedTitle} sheetRef={sheetRef as React.RefObject<BottomSheetHandle>}>
          <View style={styles.home_center}>
            <Image
              style={styles.homeimg}
              source={require('../assets/star.png')}
            />

            <CustomText size="text_medium" style={styles.aiMood}>
              Feeling Spicy?
            </CustomText>
            <CustomText size="text_small" style={styles.aiSubtext}>
              I’m your creative AI assistant.
              {'\n'}Ask anything or generate something amazing.
            </CustomText>

          </View>
            <View style={{marginTop:10,}} >
         <ImageStack/>
       </View>
        </ChatContext>
      </View>
 

      {/* <CustomButton  imgsrc={require('../assets/starsingle.png')} >Filters</CustomButton> */}

      {/* <View style={{marginTop:10,flexDirection:"row",gap:5}} >
            <ImageCounter/>
            <ImageRatio/>
        </View> */}

      {/* <Pressable style={styles.generatebtn} >
            <CustomText  style={{color:COLORS.color_primary,fontSize:20,}} >Search</CustomText>
            <Image 
            style={styles.star}
            source={require('../assets/star.png')}
            />
        </Pressable> */}

    
    </View>
     </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  aiGreeting: {
    fontWeight: '700',
    color: COLORS.color_primary,
    marginBottom: 4,
  },

  aiMood: {
    color: COLORS.color_tertiary,
    fontWeight: '600',
    marginBottom: 12,
  },

  aiSubtext: {
    color: COLORS.color_secondary,
    textAlign: 'center',
    lineHeight: 20,
    opacity: 0.85,
  },
  body: {
    paddingVertical: 15,
    flex: 1,
    backgroundColor: COLORS.color_primary,
  },
  options: {
    flexDirection: 'row',
    marginTop: 30,
    gap: 5,
  },
  generatebtn: {
    backgroundColor: COLORS.color_tertiary,
    borderRadius: 15,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 4,
  },

  star: {
    height: HEIGHT / 16,
    width: WIDTH / 10,
    objectFit: 'cover',
    tintColor: COLORS.color_primary,
  },

  optbtn: {
    borderWidth: 1,
    borderColor: COLORS.color_secondary,
    padding: 12,
    borderRadius: 100,
    justifyContent: 'center',
    width: WIDTH / 2.22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  optbtnactive: {
    borderWidth: 1,
    borderColor: COLORS.color_tertiary,
    padding: 12,
    backgroundColor: COLORS.color_tertiary,
    borderRadius: 100,
    justifyContent: 'center',
    width: WIDTH / 2.22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.color_selective,
    paddingHorizontal: 18,
    paddingBottom: 10,
  },

  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  barLarge: {
    position: 'absolute',
    width: 30,
    height: 2,
    backgroundColor: COLORS.color_tertiary,
  },

  barSmall: {
    position: 'absolute',
    height: 2,
    backgroundColor: COLORS.color_tertiary,
  },
  logoimg: {
    tintColor: COLORS.color_tertiary,
    height: HEIGHT / 18,
    width: WIDTH / 10,
    resizeMode: 'contain',
  },

  menuButton: {
    width: 40,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  bar: {
    width: 32,
    height: 2,
    backgroundColor: COLORS.color_tertiary,
  },

  chatparent: {
    //  backgroundColor:"red",
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
  },

  home_center: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeimg: {
    width: WIDTH / 2,
    height: WIDTH / 3,
    resizeMode: 'contain',
    tintColor: COLORS.color_tertiary,
  },
});

export default Home;
