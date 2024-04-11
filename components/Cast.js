import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { image185, personFallBackImage } from "../api/movieDB";

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
                    source={{
                      uri:
                        image185(person?.profile_path) || personFallBackImage,
                    }}
                    className="rounded-2xl h-24 w-20"
                  ></Image>
                </View>

                <Text className="text-white mt-1 text-xs">
                  {person?.character.length > 10
                    ? person?.character.slice(0, 10) + "..."
                    : person?.character}
                </Text>
                <Text className="text-neutral-400 mt-1 text-xs">
                  {person?.original_name.length > 10
                    ? person?.original_name.slice(0, 10) + "..."
                    : person?.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
