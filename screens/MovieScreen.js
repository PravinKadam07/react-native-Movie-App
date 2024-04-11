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
var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? " " : "mt-3";

export default function MovieScreen() {
  let movieName = "Mazeee";
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFav, toggleFav] = useState(false);
  const [cast, setCast] = useState([1, 2, 3, 4]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    //calling movie api for the data
  }, [item]);
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
            source={require("../assets/MoviePoster.png")}
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
          {movieName}
        </Text>
        {/* stats ,release,runtime */}
        <Text className="text-neutral-400 text-center text-base font-semibold">
          Release &#xb7; 2020 &#xb7; 170 min
        </Text>
        {/* genres*/}
        <View className="flex-row mx-4 justify-center space-x-2">
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Action &#xb7;
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Thriller &#xb7;
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Comedy &#xb7;
          </Text>
        </View>
        {/* Description*/}
        <Text className="text-neutral-400 tracking-wide mx-4 ">
          is simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
        </Text>
      </View>
      {/* cast */}
      <Cast navigation={navigation} cast={cast} />
      {/* similar movies */}
      {/* <MovieList
        title={"Similar Movies"}
         data={similarMovies}
        hideSeeAll={true}
      ></MovieList> */}
    </ScrollView>
  );
}
