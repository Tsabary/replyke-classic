import React from "react";
import { Text, Pressable, View } from "react-native";
import { FeedSortByOptions, useFeed } from "replyke-rn";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";

import { sortValues } from "../../constants/sortValues";
import { timeFrameValues } from "../../constants/timeFrameValues";

const SortingToolbar = ({
  openSortingSheet,
  openTimeFrameSheet,
}: {
  openSortingSheet: () => void;
  openTimeFrameSheet: () => void;
}) => {
  const { sortBy, timeFrame } = useFeed();

  const iconComponent = sortValues[sortBy!]?.icon;

  return (
    <View className="flex-row gap-2 p-4 pb-0 bg-gray-950">
      <Pressable
        onPress={openSortingSheet}
        className="w-min self-start py-2.5 px-3 rounded-xl bg-gray-900 flex-row items-center gap-2"
      >
        {iconComponent}
        <Text className="capitalize text-gray-100">
          {sortValues[sortBy!].title}
        </Text>
        <Entypo name="chevron-down" size={12} color="#fff" />
      </Pressable>
      {sortBy &&
        (["controversial", "hot", "top"] as FeedSortByOptions[]).includes(
          sortBy
        ) && (
          <Pressable
            onPress={openTimeFrameSheet}
            className="w-min self-start py-2.5 px-3 rounded-xl bg-gray-900 flex-row items-center gap-2"
          >
            <Feather name="clock" size={16} color="#6b7280" />
            <Text className="capitalize text-gray-100">
              {timeFrame ? timeFrameValues[timeFrame!] : "All time"}
            </Text>
            <Entypo name="chevron-down" size={12} color="#fff" />
          </Pressable>
        )}
    </View>
  );
};

export default SortingToolbar;
