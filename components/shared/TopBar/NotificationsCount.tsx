import React from "react";
import { View, Text, Pressable } from "react-native";
import { useAppNotifications } from "replyke-rn";
import { useRouter } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";

const NotificationsCount = () => {
  const router = useRouter();

  const { unreadAppNotificationsCount } = useAppNotifications();

  return (
    <Pressable
      onPress={() => router.navigate("/notifications")}
      className="relative"
    >
      <Entypo name="bell" size={28} color="white" />

      {!!unreadAppNotificationsCount && (
        <View className="absolute -top-1 -right-1 bg-red-500 flex justify-center items-center rounded-full aspect-square size-5">
          <Text className="text-xs text-white">
            {unreadAppNotificationsCount}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default NotificationsCount;
