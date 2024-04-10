import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

var { width, height } = Dimensions.get("window");
export default function SearchScreen() {
  const movieName = "Hail hydra avenderendgame";
  const [results, setResults] = useState([1, 2, 3, 4]);
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-3 mb-3 flex-row justify-between items-center border border-neutral-400 rounded-full">
        <TextInput
          placeholder="Search Movies"
          placeholderTextColor={"lightgray"}
          className="text-white font-semibold pb-2 pl-6 tracking-wider text-base flex-1 "
        />
        <TouchableOpacity
          className="rounded-full p-3 m-1 bg-neutral-500"
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <XMarkIcon size={25} color={"white"} />
        </TouchableOpacity>
      </View>
      {/* result */}

      {results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Results ({results.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={(item) => {
                    navigation.push("Movie", item);
                  }}
                >
                  <View className="space-y-2 mb-4">
                    <Image
                      className="rounded-3xl"
                      source={require("../assets/MoviePoster.png")}
                      style={{ width: width * 0.44, height: height * 0.3 }}
                    ></Image>
                    <Text className="text-neutral-400 ml-1">
                      {movieName.length > 22
                        ? movieName.slice(0, 22) + "..."
                        : movieName}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/NoResult.png")}
            className="h-96 w-96"
          ></Image>
        </View>
      )}
    </SafeAreaView>
  );
}
