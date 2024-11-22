import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { MovieSection } from '@/components/home/movies/moviesection'

const index = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <MovieSection/>
  </SafeAreaView>
  )
}

export default index