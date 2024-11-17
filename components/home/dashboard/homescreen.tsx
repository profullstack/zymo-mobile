import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { MovieSection } from './moviesection'
import { MusicSection } from './musicsection'
import { LiveTvSection } from './livetvsection'
import { BooksSection } from './booksection'
import { PodcastSection } from './podcastsection'

export  const HomeScreen = () => {
  return (
    <ScrollView style={{flex: 1, backgroundColor:Colors.backgroundColor}}>
      <MovieSection/>
      <MusicSection/>
      <LiveTvSection/>
      <BooksSection/>
      <PodcastSection/>
    </ScrollView>
  )
}
