import React from "react";
import { View } from "react-native";
import { FeedProvider } from "replyke-rn";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import Feed from "../components/home/Feed";
import { TopBar } from "../components/shared/TopBar";

const Home = () => {
  return (
    <>
      <StatusBar style="light" backgroundColor="#000" />
      <SafeAreaView className="relative flex-1">
        <TopBar />
        <View className="flex-1 mt-2">
          <FeedProvider sortBy="hot">
            <Feed />
          </FeedProvider>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Home;
