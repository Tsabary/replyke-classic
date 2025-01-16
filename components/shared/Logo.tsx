import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Logo = () => {
  return (
    <TouchableOpacity activeOpacity={0.7} className="p-2">
      <Text className="text-white">Logo</Text>
    </TouchableOpacity>
  );
};

export default Logo;
