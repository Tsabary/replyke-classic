import React from "react";
import { Pressable } from "react-native";
import { UserAvatar, useUser } from "replyke-rn";
import Feather from "@expo/vector-icons/Feather";

import useSheetManager from "../../../hooks/useSheetManager";
import { useRouter } from "expo-router";

function AvatarMenuTrigger() {
  const router = useRouter();
  const { user } = useUser();
  const { closeCommentSectionDrawer } = useSheetManager();

  if (user) {
    return (
      <Pressable
        onPress={() => {
          closeCommentSectionDrawer!();
          router.navigate("/profile");
        }}
      >
        <UserAvatar user={user} size={32} />
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={() => {
        closeCommentSectionDrawer!();
        router.navigate("/authenticate");
      }}
    >
      <Feather name="user" size={22} color="#fff" />
    </Pressable>
  );
}

export default AvatarMenuTrigger;
