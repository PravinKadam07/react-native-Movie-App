import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";

import React from "react";
import Carousel from "react-native-snap-carousel-new";
import { useNavigation } from "@react-navigation/native";
import { image500, posterFallBackImage } from "../api/movieDB";
var { width, height } = Dimensions.get("window");

export default function TrendingMovies({ data }) {
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };
  return (
    <View className="mb-8">
      <Text className="text-white text-2xl font-semibold mx-1 mb-5">
        Trending
      </Text>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={handleClick} />
        )}
        sliderWidth={width}
        itemWidth={width * 0.62}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        slideStyle={{ display: "flex", alignItems: "center" }}
      ></Carousel>
    </View>
  );
}

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={{ uri: image500(item.poster_path) || posterFallBackImage }}
        style={{
          width: width * 0.6,
          height: height * 0.4,
        }}
        className="rounded-3xl"
      ></Image>
    </TouchableWithoutFeedback>
  );
};
