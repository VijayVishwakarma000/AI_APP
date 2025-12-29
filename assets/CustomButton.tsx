import { View, Text, Pressable, StyleSheet, Dimensions ,Image, ImageSource, ImageSourcePropType} from 'react-native'
import React from 'react'
import { COLORS } from './variables/vars'
 
import { ChevronRightIcon } from 'lucide-react-native';
import CustomText from '../components/CustomText';
const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
interface props  {
    children:string,
    imgsrc?:ImageSourcePropType ,
    icon?:React.ReactNode
}


const CustomButton = ({children,imgsrc,icon}:props) => {
  return (
   
        <Pressable style={styles.filterbtn}>
                {imgsrc? <Image 
            style={styles.starsingle}
            source={imgsrc}
            />:icon?icon:""}
             

            <CustomText style={{flexGrow:1}}  size='text_body' >{children}</CustomText>
            <ChevronRightIcon  size={30} color={COLORS.color_tertiary} />
        </Pressable>
  )
}

const styles = StyleSheet.create({
     filterbtn:{
            backgroundColor:COLORS.color_selective,
        borderRadius:15,
        marginTop:10,
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:15,
        paddingRight:10,
        paddingVertical:4,
        gap:10
      },
       starsingle:{
          height:HEIGHT/16,
          width:WIDTH/14,
          objectFit:"cover",
          tintColor:COLORS.color_tertiary
        },
})

export default CustomButton