import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { useState } from "react";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/MovieList";
const ios = Platform.OS == "ios";

export default function HomeScreen() {
  const [trending, setTrending] = useState([1, 2, 3]);
  const [upcoming, setUpcoming] = useState([1, 2, 3]);
  const [topRated, setTopRated] = useState([1, 2, 3]);

  return (
    <View className="flex-1 bg-neutral-800">
      {/* search bar and logo */}
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between item-centre mx-4 my-1">
          <Bars3CenterLeftIcon size="35" strokeWidth={2} color="white" />
          <Text className="text-white text-3xl font-bold">
            <Text style={{ color: "#eab308" }}>M</Text>ovies
          </Text>
          <TouchableOpacity>
            <MagnifyingGlassIcon
              size="35"
              strokeWidth={2}
              color="white"
            ></MagnifyingGlassIcon>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 10 }}
      >
        {/* trending movie carousal */}
        <TrendingMovies data={trending}></TrendingMovies>
        {/* upcoming movie carousal */}
        <MovieList title="Upcoming" data={upcoming}></MovieList>
      </ScrollView>
    </View>
  );
}
