import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { MoviePlayer } from "@/components/home/movies/movieplayer";
import { MovieInfoComponent } from "@/components/home/movies/movieinfo";
import { MovieCommentSection } from "@/components/home/movies/moviecomentsection";


export const SingleMovie = () => {
  return(
    <View>
      <MoviePlayer />
      <MovieInfoComponent
        title="Dunkirk: A movie by Christopher Nolan"
        creator="Christopher Nolan"
        views=  "576,969"
        likes="1.7K"
        shares="632"
        saves="SAVE"
      />
      <MovieCommentSection/>
    </View>
  )
}