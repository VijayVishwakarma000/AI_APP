import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import { COLORS } from '../assets/variables/vars';
const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
const NoChatsFound = () => {
  return (
    <View style={style.notfound}>
       <CustomText style={{color:COLORS.color_secondary}}  size='text_small' >No Chats Found</CustomText>
    </View>
  )
}

const style = StyleSheet.create({
    notfound:{
        padding:10,
        minHeight:400,
        alignItems:"center",
        justifyContent:"center"

    }
})

export default NoChatsFound