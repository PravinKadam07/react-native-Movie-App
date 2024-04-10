import { View, Text, Dimensions } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
var { width, height } = Dimensions.get("window");

export default function Loading() {
  return (
    <View
      style={{ height, width }}
      className="absolute flex-row justify-center items-center"
    >
      <Progress.CircleSnail thickness={8} size={120} color={"#eab308"} />
    </View>
  );
}
