import React, { useCallback, useEffect, useRef } from "react";

import {
  Animated,
  DimensionValue,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";

type SkeletonProps = {
  width: DimensionValue;
  height: DimensionValue;
  borderRadius?: number;
  bgColor?: string;
  style?: StyleProp<ViewStyle>;
};

const Skeleton = ({
  width,
  height,
  bgColor = "#eee", // This can be any color, depending on your theme
  borderRadius = 8, // You can adjust the default borderRadius too
  style,
}: SkeletonProps) => {
  const animation = useRef(new Animated.Value(0.5)).current;

  const startAnimation = useCallback(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1500, // You can adjust the time as you want
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0.5,
          duration: 1500, // You can adjust the time as you want
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animation]);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  const animatedStyle = {
    opacity: animation,
    width,
    height,
    backgroundColor: bgColor,
    borderRadius,
  };

  return <Animated.View style={[style, animatedStyle]} />;
};

const SinglePostSkeleton = () => {
  return (
    <View className="bg-gray-900 rounded-2xl p-4 w-full gap-3">
      <View className="flex-row gap-2 items-center">
        <Skeleton height={36} width={36} borderRadius={12} bgColor="#4b5563" />
        <View className="gap-2 flex-1 ">
          <Skeleton
            height={10}
            width="auto"
            borderRadius={6}
            bgColor="#4b5563"
          />
          <Skeleton
            height={10}
            width="60%"
            bgColor="#4b5563"
            borderRadius={6}
            style={{ marginTop: 4 }}
          />
        </View>
      </View>
      <View className="w-full aspect-video">
        <Skeleton
          height="100%"
          width="100%"
          borderRadius={12}
          bgColor="#4b5563"
        />
      </View>
      <View className="flex-row gap-3">
        <Skeleton
          height="auto"
          width="25%"
          borderRadius={12}
          bgColor="#4b5563"
        />
        <Skeleton
          height="auto"
          width="11%"
          borderRadius={12}
          bgColor="#4b5563"
          style={{ aspectRatio: 1 }}
        />
        <Skeleton
          height="auto"
          width="11%"
          borderRadius={12}
          bgColor="#4b5563"
          style={{ aspectRatio: 1 }}
        />
        <View className="flex-1" />
        <Skeleton
          height="auto"
          width="11%"
          borderRadius={12}
          style={{ aspectRatio: 1 }}
          bgColor="#4b5563"
        />
      </View>
    </View>
  );
};

const BookmarkSkeleton = () => {
  return (
    <View className="flex-row gap-3 px-4 py-2.5 items-center">
      <Skeleton height={36} width={36} borderRadius={20} bgColor="#d1d5db" />
      <Skeleton height={10} width="70%" borderRadius={6} bgColor="#d1d5db" />
    </View>
  );
};

export { SinglePostSkeleton, BookmarkSkeleton };

export default Skeleton;
