import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import {
  fetchMovieCredit,
  fetchSimilarMovies,
  image500,
  posterFallBackImage,
} from "../api/movieDB";
import { fetchMovieDetails } from "../api/movieDB";
var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? " " : "mt-3";

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFav, toggleFav] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarmovies(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    setLoading(true);
    const data = await fetchMovieDetails(id);
    if (data) setMovie(data);

    setLoading(false);
  };

  const getMovieCredits = async (id) => {
    setLoading(true);
    const data = await fetchMovieCredit(id);
    if (data && data.cast) setCast(data.cast);

    setLoading(false);
  };
  const getSimilarmovies = async (id) => {
    setLoading(true);
    const data = await fetchSimilarMovies(id);
    if (data && data.results) setSimilarMovies(data.results);
    setLoading(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      style={{ flex: 1, backgroundColor: "#000" }} // Set background color to black
    >
      <View style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
        <SafeAreaView
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 16,
            zIndex: 20,
          }}
          className={topMargin}
        >
          <TouchableOpacity
            style={{
              borderRadius: 14,
              padding: 6,
              backgroundColor: "#eab308",
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              toggleFav(!isFav);
            }}
          >
            <HeartIcon size={42} color={isFav ? "#eab308" : "white"} />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Image
            source={{
              uri: image500(movie?.poster_path) || posterFallBackImage,
            }}
            style={{ width: width, height: height * 0.65, resizeMode: "cover" }} // Adjust styles
          />
          <LinearGradient
            colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
            style={{ width, height: height * 1 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />
        </>
      )}

      {/* movie details */}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        {/* title */}
        <Text className="text-white text-3xl text-center tracking-wider font-bold">
          {movie?.title}
        </Text>
        {/* stats ,release,runtime */}
        {movie?.id ? (
          <Text className="text-neutral-400 text-center text-base font-semibold">
            {movie?.status} &#xb7; {movie?.release_date?.split("-")[0]} &#xb7;{" "}
            {movie?.runtime} min
          </Text>
        ) : null}

        {/* genres*/}
        <View className="flex-row mx-4 justify-center space-x-2">
          {movie?.genres?.map((genres, index) => {
            let lastDot = index + 1 != movie.genres.length;
            return (
              <Text
                key={index}
                className="text-neutral-400 font-semibold text-base text-center"
              >
                {genres?.name}
                {lastDot ? "  \u00B7" : null}
              </Text>
            );
          })}
        </View>
        {/* Description*/}
        <Text className="text-neutral-400 tracking-wide mx-4 ">
          {movie?.overview}
        </Text>
      </View>
      {/* cast */}
      <Cast navigation={navigation} cast={cast} />
      {/* similar movies */}
      <MovieList
        title={"Similar Movies"}
        data={similarMovies}
        hideSeeAll={true}
      ></MovieList>
    </ScrollView>
  );
}
