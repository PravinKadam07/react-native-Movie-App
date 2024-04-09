import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function Cast({ cast, navigation }) {
  const personName = "Kenu Reevs";
  const characterName = "John Wick";
  return (
    <View className="my-6">
      <Text className="text-white mx-4 mb-5 text-lg">Top Cast</Text>
      <ScrollView
        horizontal
        showHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                className="mr-4 items-center"
                onPress={() => navigation.navigate("Person", person)}
              >
                <View className="overflow-hidden items-center rounded-full h-20 w-20 border border-neutral-500">
                  <Image
                    source={require("../assets/MoviePoster.png")}
                    className="rounded-2xl h-24 w-20"
                  ></Image>
                </View>

                <Text className="text-white mt-1 text-xs">
                  {characterName.length > 10
                    ? characterName.slice(0, 10) + "..."
                    : characterName}
                </Text>
                <Text className="text-neutral-400 mt-1 text-xs">
                  {personName.length > 10
                    ? personName.slice(0, 10) + "..."
                    : personName}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
