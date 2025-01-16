import React, { useRef } from "react";
import { View } from "react-native";
import { FeedProvider } from "replyke-rn";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheet from "@gorhom/bottom-sheet";

import Feed from "../../components/home/Feed";
import SortingToolbar from "../../components/home/SortingToolbar";

const Home = () => {
  const sortingDrawerRef = useRef<BottomSheet>(null);
  const timeFrameDrawerRef = useRef<BottomSheet>(null);

  const openSortingSheet = () => {
    sortingDrawerRef.current?.snapToIndex(0);
  };

  const closeSortingSheet = () => {
    sortingDrawerRef.current?.close();
  };

  const openTimeFrameSheet = () => {
    timeFrameDrawerRef.current?.snapToIndex(0);
  };

  const closeTimeFrameSheet = () => {
    timeFrameDrawerRef.current?.close();
  };

  return (
    <>
      <StatusBar style="light" backgroundColor="#000" />
      <SafeAreaView className="relative flex-1">
        <FeedProvider sortBy="hot">
          <SortingToolbar
            openSortingSheet={openSortingSheet}
            openTimeFrameSheet={openTimeFrameSheet}
          />
          <View className="flex-1 w-screen">
            <Feed />
          </View>
        </FeedProvider>
      </SafeAreaView>
    </>
  );
};

export default Home;
