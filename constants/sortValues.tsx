import React from "react";
import { FeedSortByOptions } from "replyke-rn";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export const sortValues: Record<
  FeedSortByOptions,
  { title: string; icon: React.ReactNode; iconSelected: React.ReactNode }
> = {
  new: {
    title: "New",
    icon: <Feather name="sun" size={12} color="#6b7280" />,
    iconSelected: <Feather name="sun" size={12} color="#fff" />,
  },
  hot: {
    title: "Hot",
    icon: <FontAwesome5 name="fire" size={12} color="#6b7280" />,
    iconSelected: <FontAwesome5 name="fire" size={12} color="#fff" />,
  },
  top: {
    title: "Top",
    icon: <FontAwesome5 name="trophy" size={12} color="#6b7280" />,
    iconSelected: <FontAwesome5 name="trophy" size={12} color="#fff" />,
  },
  controversial: {
    title: "Controversial",
    icon: <FontAwesome5 name="balance-scale" size={12} color="#6b7280" />,
    iconSelected: <FontAwesome5 name="balance-scale" size={12} color="#fff" />,
  },
};
