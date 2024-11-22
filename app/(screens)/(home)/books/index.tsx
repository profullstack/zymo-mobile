import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { BooksSection } from '@/components/home/books/bookssection'

const index = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <BooksSection/>
  </SafeAreaView>
  )
}

export default index