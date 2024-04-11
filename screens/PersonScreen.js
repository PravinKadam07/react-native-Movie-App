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
import { useNavigation, useRoute } from "@react-navigation/native";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import {
  fetchPersonDetails,
  fetchPersonMovies,
  image342,
  personFallBackImage,
} from "../api/movieDB";
var { width, height } = Dimensions.get("window");

const ios = Platform.OS == "ios";
const VMargin = ios ? " " : "my-3";

export default function PersonScreen() {
  const [isFav, toggleFav] = useState(false);
  const [personMovies, setPersonMovies] = useState([]);
  const [person, setPerson] = useState({});
  const [loading, setLoading] = useState(false);
  const { params: item } = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, [item]);

  const getPersonDetails = async (id) => {
    setLoading(true);
    const data = await fetchPersonDetails(id);
    if (data) setPerson(data);
    setLoading(false);
  };

  const getPersonMovies = async (id) => {
    setLoading(true);
    const data = await fetchPersonMovies(id);
    if (data && data.cast) setPersonMovies(data.cast);
    setLoading(false);
  };

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
      {loading ? (
        <Loading />
      ) : (
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
                source={{
                  uri: image342(person?.profile_path) || personFallBackImage,
                }}
                style={{ height: height * 0.43, width: width * 0.73 }}
              ></Image>
            </View>
          </View>

          <View className="mt-6">
            <Text className="text-center text-white text-3xl font-bold">
              {person?.name}
            </Text>
            <Text className="text-base text-neutral-500 text-center">
              {person?.place_of_birth}
            </Text>
          </View>
          <View className="mx-3 mt-6 p-4 flex-row justify-between items-center bg-neutral-700 rounded-full">
            <View className="border-r-2 border-r-neutral-200 px-2 items-center">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.gender == 1 ? "Female" : "Male"}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-200 px-3 items-center">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.birthday}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-200 px-2 items-center">
              <Text className="text-white font-semibold">Known For</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.known_for_department}
              </Text>
            </View>
            <View className="">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.popularity?.toFixed(2)} %
              </Text>
            </View>
          </View>
          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">
              {person?.biography || "N/A"}
            </Text>
          </View>
          {/* movie list */}
          <MovieList title={"Movies"} hideSeeAll={true} data={personMovies} />
        </View>
      )}
    </ScrollView>
  );
}
