import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { LiveTvSection } from '@/components/home/livestreams/livetvsection'

const index = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LiveTvSection/>
    </SafeAreaView>
  )
}

export default index