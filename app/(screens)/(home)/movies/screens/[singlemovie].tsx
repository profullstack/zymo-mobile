import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { MoviePlayer } from "@/components/home/movies/movieplayer";
import { MovieInfoComponent } from "@/components/home/movies/movieinfo";
import { MovieCommentSection } from "@/components/home/movies/moviecomentsection";
import { SingleMovie } from "@/components/home/movies/signlemovie";

const singlemovie = () => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SingleMovie/>
    </SafeAreaView>
  );
};

export default singlemovie;
