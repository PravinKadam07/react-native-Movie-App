import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../api/movieDB";
const ios = Platform.OS == "ios";

export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    setLoading(true);
    const data = await fetchTrendingMovies();

    if (data && data.results) setTrending(data.results);
    setLoading(false);
  };

  const getUpcomingMovies = async () => {
    setLoading(true);
    const data = await fetchUpcomingMovies();
    if (data && data.results) setUpcoming(data.results);
    setLoading(false);
  };

  const getTopRatedMovies = async () => {
    setLoading(true);
    const data = await fetchTopRatedMovies();
    if (data && data.results) setTopRated(data.results);

    setLoading(false);
  };

  return (
    <View className="flex-1 bg-neutral-800">
      {/* search bar and logo */}
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-centre mx-4 my-1">
          <Bars3CenterLeftIcon size="35" strokeWidth={2} color="white" />
          <Text className="text-white text-3xl font-bold">
            <Text style={{ color: "#eab308" }}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon
              size="35"
              strokeWidth={2}
              color="white"
            ></MagnifyingGlassIcon>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 10 }}
        >
          {/* trending movie carousal */}
          {trending.length > 0 && (
            <TrendingMovies data={trending}></TrendingMovies>
          )}
          {/* upcoming movie carousal */}
          {upcoming.length > 0 && (
            <MovieList title="Upcoming" data={upcoming}></MovieList>
          )}
          {/* TopRated movie carousal */}
          {topRated.length > 0 && (
            <MovieList title="Top Rated" data={topRated}></MovieList>
          )}
        </ScrollView>
      )}
    </View>
  );
}
