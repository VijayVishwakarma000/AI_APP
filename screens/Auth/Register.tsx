import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../../assets/CustomButton'


const EmailPage = ()=>{
    return <View>
            <TextInput placeholder='Enter your email..' />
           <CustomButton>Next</CustomButton>
    </View>
}












const Register = () => {

    const [progress, setprogress] = useState<number>(0)
    const [currentPage, setcurrentPage] = useState<number>(0)

    function renderScreens(){
        switch (currentPage) {
            case 0:
                return <EmailPage/>

        }
    }

  return (
    <View>
            
    {renderScreens()}

    </View>
  )
}

export default Register