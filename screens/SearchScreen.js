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
import { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import { debounce } from "lodash";
import { image185, posterFallBackImage, searchMovie } from "../api/movieDB";
var { width, height } = Dimensions.get("window");

export default function SearchScreen() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSearch = (value) => {
    if (value && value.length > 2) {
      searchMovie({
        query: value,
        include_adult: "false",
        language: "en-US",
        page: "1",
      }).then((data) => {
        setLoading(false);
        if (data && data.results) setResults(data.results);
      });
    } else {
      setLoading(false);
      setResults([]);
    }
  };
  const textDebounceHandle = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-3 mb-3 flex-row justify-between items-center border border-neutral-400 rounded-full">
        <TextInput
          onChangeText={textDebounceHandle}
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

      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
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
                      source={{
                        uri: image185(item.poster_path) || posterFallBackImage,
                      }}
                      style={{ width: width * 0.44, height: height * 0.3 }}
                    ></Image>
                    <Text className="text-neutral-400 ml-1">
                      {item?.title.length > 22
                        ? item?.title.slice(0, 22) + "..."
                        : item?.title}
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
