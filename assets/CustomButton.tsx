import { View, Text, Pressable, StyleSheet, Dimensions ,Image, ImageSource, ImageSourcePropType, GestureResponderEvent, ActivityIndicator} from 'react-native'
import React from 'react'
import { COLORS } from './variables/vars'
 
import { ChevronRightIcon } from 'lucide-react-native';
import CustomText from '../components/CustomText';
const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
interface props  {
    children:string,
    imgsrc?:ImageSourcePropType ,
    icon?:React.ReactNode,
    onclick?:(e:GestureResponderEvent)=>void,
    loading?:boolean
} 


const CustomButton = ({children,imgsrc,icon,loading,onclick}:props) => {
  return (
   
        <Pressable onPress={onclick} style={styles.filterbtn}>
            {
              loading?<ActivityIndicator/>:
                imgsrc? <Image 
            style={styles.starsingle}
            source={imgsrc}
            />:icon?icon: <CustomText  size='text_body' >{children}</CustomText>
            }
             
           

            {/* <ChevronRightIcon  size={30} color={COLORS.color_tertiary} /> */}
        </Pressable>
  )
}

const styles = StyleSheet.create({
     filterbtn:{
            backgroundColor:COLORS.color_selective,
        borderRadius:10,
        marginTop:10,
        flexDirection:"row",
        alignItems:"center",
        padding:12,
        gap:10,
        justifyContent:"center"
      },
       starsingle:{
          height:HEIGHT/16,
          width:WIDTH/14,
          objectFit:"cover",
          tintColor:COLORS.color_tertiary
        },
})

export default CustomButton