import React from "react";
import { useUser } from "replyke-rn";
import { Pressable, View } from "react-native";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import AvatarMenuTrigger from "./AvatarMenuTrigger";
import NotificationsCount from "./NotificationsCount";
import Logo from "../Logo";

const TopBar = () => {
  const router = useRouter();
  const { user } = useUser();
  return (
    <View
      className="flex-row py-2 px-6 items-center justify-between"
      style={{ columnGap: 20 }}
    >
      <Logo />
      <View>
        {user && (
          <>
            <Pressable onPress={() => router.navigate("/create-post")}>
              <AntDesign name="pluscircleo" size={28} color="white" />
            </Pressable>
            <Pressable onPress={() => router.navigate("/lists")}>
              <FontAwesome name="bookmark" size={28} color="white" />
            </Pressable>
            <NotificationsCount />
          </>
        )}

        <AvatarMenuTrigger />
      </View>
    </View>
  );
};

export default TopBar;
