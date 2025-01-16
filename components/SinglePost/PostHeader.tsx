import React from "react";
import { View, Text, Pressable } from "react-native";
import { getUserName, useEntity, UserAvatar } from "replyke-rn";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import useSheetManager from "../../hooks/useSheetManager";

const PostHeader = () => {
  const { entity } = useEntity();
  const { openPostOptionsSheet } = useSheetManager();

  if (!entity) return null;

  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-3.5">
        <UserAvatar user={entity.user} size={32} borderRadius={8} />
        <Text className="text-white">{getUserName(entity.user!)}</Text>
      </View>
      <Pressable onPress={() => openPostOptionsSheet?.(entity)} className="p-1">
        <FontAwesome6 name="ellipsis-vertical" size={28} color="#f3f4f6" />
      </Pressable>
    </View>
  );
};

export default PostHeader;
