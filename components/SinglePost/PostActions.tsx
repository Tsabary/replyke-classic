import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Entity, useEntity, useIsEntitySaved, useUser } from "replyke-rn";
import { showMessage } from "react-native-flash-message";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";

import { cn } from "../../utils/cn";
import useSheetManager from "../../hooks/useSheetManager";

function PostActions({ entity: entityProp }: { entity: Entity }) {
  const { user } = useUser();
  const { openCommentSectionDrawer, openSaveToListSheet } = useSheetManager();

  const [entity, setEntity] = useState(entityProp);

  const {
    entity: entityFromHook,
    userUpvotedEntity,
    upvoteEntity,
    removeEntityUpvote,
    userDownvotedEntity,
    downvoteEntity,
    removeEntityDownvote,
  } = useEntity();

  const { entityIsSaved, checkIfEntityIsSaved } = useIsEntitySaved();

  useEffect(() => {
    if (!entityFromHook) return;
    setEntity(entityFromHook);
  }, [entityFromHook]);

  useEffect(() => {
    checkIfEntityIsSaved(entity.id);
  }, [entityProp, checkIfEntityIsSaved]);

  return (
    <View className="flex-row w-full mt-4" style={{ columnGap: 12 }}>
      {/* VOTING BUTTONS */}
      <View className="flex-row items-center rounded-2xl bg-gray-800">
        <TouchableOpacity
          onPress={() => {
            if (!user) {
              showMessage({
                message: "Oops! Login Required",
                description: "Please sign in or create an account to continue.",
                type: "warning",
              });
              return;
            }
            if (userUpvotedEntity) {
              removeEntityUpvote?.();
            } else {
              upvoteEntity?.();
            }
          }}
          className={cn(
            "flex-row items-center py-2.5 px-4 rounded-2xl",
            userUpvotedEntity && "bg-green-500/40"
          )}
          style={{ columnGap: 6 }}
        >
          {userUpvotedEntity ? (
            <Feather name="arrow-up-circle" size={28} color="#22c55e" />
          ) : (
            <Feather name="arrow-up-circle" size={28} color="#9ca3af" />
          )}
          <Text
            className={userUpvotedEntity ? "text-[#22c55e]" : "text-[#9ca3af]"}
          >
            {entity?.upvotes.length}
          </Text>
        </TouchableOpacity>
        <View
          className={cn(
            "w-[1px] h-5 ",
            userUpvotedEntity ? "bg-[#1f2937]" : "bg-[#9ca3af]"
          )}
        />
        <TouchableOpacity
          onPress={() => {
            if (!user) {
              showMessage({
                message: "Oops! Login Required",
                description: "Please sign in or create an account to continue.",
                type: "warning",
              });
              return;
            }
            if (userDownvotedEntity) {
              removeEntityDownvote?.();
            } else {
              downvoteEntity?.();
            }
          }}
          className="flex-row items-center py-2.5 pr-4 pl-3"
          style={{ columnGap: 6 }}
        >
          {userDownvotedEntity ? (
            <Feather name="arrow-down-circle" size={28} color="#ef4444" />
          ) : (
            <Feather name="arrow-down-circle" size={28} color="#9ca3af" />
          )}
        </TouchableOpacity>
      </View>

      {/* OPEN COMMNENT SECTION */}
      <TouchableOpacity
        onPress={() => openCommentSectionDrawer?.(entity.id)}
        className={cn(
          "flex-row items-center p-2.5 rounded-2xl bg-gray-800",
          (entity.repliesCount || 0) > 0 && "px-4"
        )}
        style={{ columnGap: 6 }}
      >
        <Ionicons name="chatbubble" size={24} color="#9ca3af" />

        {(entity.repliesCount || 0) > 0 && (
          <Text className="text-[#9ca3af]">{entity.repliesCount}</Text>
        )}
      </TouchableOpacity>

      {/* COPY BUTTON */}
      {/* <TouchableOpacity
        onPress={async (e) => {
          e.stopPropagation();
          await Clipboard.setStringAsync(entity.content || "");
        }}
        className="p-2.5 rounded-2xl bg-gray-800"
      >
        <DocumentDuplicateIcon size={28} color="#9ca3af" />
      </TouchableOpacity> */}

      <View className="flex-1" />

      {/* BOOKMARK BUTTON */}
      <TouchableOpacity
        onPress={() =>
          user
            ? openSaveToListSheet?.(entity.id)
            : showMessage({
                message: "Oops! Login Required",
                description: "Please sign in or create an account to continue.",
                type: "warning",
              })
        }
        className={cn(
          "p-2.5 rounded-2xl",
          entityIsSaved ? "bg-blue-500/40" : "bg-gray-800"
        )}
      >
        <FontAwesome
          name="bookmark"
          size={24}
          color={entityIsSaved ? "#60a5fa" : "#9ca3af"}
        />
      </TouchableOpacity>
    </View>
  );
}

export default PostActions;
