import React from "react";
import { View, StyleSheet } from "react-native";

interface IHomeScreenBottomPaddingProps {
  fillColor: string;
}

const HomeScreenBottomPadding = ({
  fillColor
}: IHomeScreenBottomPaddingProps) => (
  <View
    style={[styles.safeViewBottomPadding, { backgroundColor: fillColor }]}
  ></View>
);

const styles = StyleSheet.create({
  safeViewBottomPadding: {
    width: "100%",
    height: 35,
    position: "absolute",
    bottom: 0,
    zIndex: -10
  }
});

export default HomeScreenBottomPadding;
