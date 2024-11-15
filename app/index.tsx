import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { LoginScreen } from "@/components/auth/login";

const index = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <LoginScreen/>
    </SafeAreaView>
  )
}

export default index