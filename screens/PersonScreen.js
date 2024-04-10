import {
  View,
  Text,
  Platform,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MovieList from "../components/MovieList";
var { width, height } = Dimensions.get("window");

const ios = Platform.OS == "ios";
const VMargin = ios ? " " : "my-3";

export default function PersonScreen() {
  const [isFav, toggleFav] = useState(false);
  const [personMovies, setPersonMovies] = useState([1, 2, 3, 4]);
  const navigation = useNavigation();
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 
      bg-neutral-900"
    >
      {/* back button */}
      <SafeAreaView
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
          zIndex: 20,
        }}
        className={VMargin}
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
      {/* person details */}
      <View>
        <View
          className="flex-row justify-center "
          style={{
            shadowColor: "gray",
            shadowRadius: 40,
            shadowOpacity: 1,
            shadowOffset: { width: 0, height: 5 },
          }}
        >
          <View className="overflow-hidden items-center rounded-full h-72 w-72 border-1 border-neutral-400  ">
            <Image
              source={require("../assets/MoviePoster.png")}
              style={{ height: height * 0.43, width: width * 0.73 }}
            ></Image>
          </View>
        </View>

        <View className="mt-6">
          <Text className="text-center text-white text-3xl font-bold">
            John Wick
          </Text>
          <Text className="text-base text-neutral-500 text-center">
            London ,UK
          </Text>
        </View>
        <View className="mx-3 mt-6 p-4 flex-row justify-between items-center bg-neutral-700 rounded-full">
          <View className="border-r-2 border-r-neutral-200 px-2 items-center">
            <Text className="text-white font-semibold">Gender</Text>
            <Text className="text-neutral-300 text-sm">male</Text>
          </View>
          <View className="border-r-2 border-r-neutral-200 px-3 items-center">
            <Text className="text-white font-semibold">Birthday</Text>
            <Text className="text-neutral-300 text-sm">1968-02-21</Text>
          </View>
          <View className="border-r-2 border-r-neutral-200 px-2 items-center">
            <Text className="text-white font-semibold">Known For</Text>
            <Text className="text-neutral-300 text-sm">Acting</Text>
          </View>
          <View className="">
            <Text className="text-white font-semibold">Popularity</Text>
            <Text className="text-neutral-300 text-sm">64.23</Text>
          </View>
        </View>
        <View className="my-6 mx-4 space-y-2">
          <Text className="text-white text-lg">Biography</Text>
          <Text className="text-neutral-400 tracking-wide">
            Keanu Reeves is a Canadian actor, producer, and musician, born on
            September 2, 1964, in Beirut, Lebanon. He rose to fame for his roles
            in iconic films such as "The Matrix" trilogy, "Speed," and "John
            Wick" series. Reeves' acting style often embodies stoicism and
            intense physicality, earning him praise for his versatility and
            dedication to his craft. Despite personal tragedies, including the
            loss of loved ones, Reeves has maintained a humble and private
            demeanor. He is also known for his philanthropy, including his
            involvement in cancer research and children's hospitals. Reeves is
            widely regarded as one of Hollywood's most beloved and respected
            actors.
          </Text>
        </View>
        {/* movie list */}
        <MovieList title={"Movies"} hideSeeAll={true} data={personMovies} />
      </View>
    </ScrollView>
  );
}
