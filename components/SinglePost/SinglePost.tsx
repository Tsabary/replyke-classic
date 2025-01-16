import { View, Text } from "react-native";
import React from "react";
import PostActions from "./PostActions";
import { useEntity } from "replyke-rn";
import PostKeywords from "./PostKeywords";
import PostHeader from "./PostHeader";
import PostCommentsTeaser from "./PostCommentsTeaser";

const SinglePost = () => {
  const { entity } = useEntity();

  if (!entity) return null;
  return (
    <View className="bg-gray-900 rounded-xl p-4 gap-2.5">
      <PostHeader />
      <PostKeywords />

      <View className="bg-white aspect-square rounded-xl p-6 justify-center">
        <Text
          className="text-2xl font-semibold text-center"
          style={{ fontFamily: "SpaceMono" }}
        >
          {entity.content}
        </Text>
      </View>

      {/* Why are we passing entity? Check */}
      <PostActions entity={entity} />
      <PostCommentsTeaser />
    </View>
  );
};

export default SinglePost;
