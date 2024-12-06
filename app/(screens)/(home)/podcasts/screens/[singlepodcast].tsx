import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { PodcastPlayer } from '@/components/home/podcasts/podcastplayer'
import { SinglePodcast } from '@/components/home/podcasts/singlepodcast'

const singlepodcast = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SinglePodcast/>
    </SafeAreaView>
  )
}

export default singlepodcast