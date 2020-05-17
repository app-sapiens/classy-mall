import React, { useEffect, Fragment } from "react";
import {
  TextInput,
  View,
  Dimensions,
  Animated,
  ScrollView,
  StatusBar,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Button } from "react-native-paper";
import SVGMapLL from "../components/SVGMapLL";
import SVGMapUL from "../components/SVGMapUL";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../constants/colors";
import { searchShopsTitles } from "../helpers/filtering";
import { LEVELS } from "../constants/shopList";
import { IShopSearchResult, NavToShopIdFunc } from "../types";
import PulseButton from "../components/PulseButton";
import { isIos } from "../helpers/common";
import SafeAreaViewBottomPadding from "../components/SafeAreaViewBottomPadding";

const { width, height } = Dimensions.get("window");

const blankShopsHighlight: IShopSearchResult = {
  [LEVELS.LL]: [],
  [LEVELS.UL]: [],
};

export const SVGMapView = ({ navigation }) => {
  const [textInput, setTextInput] = React.useState("");
  const [left] = React.useState(new Animated.Value(0));
  const [position, setPosition] = React.useState("right");
  const [shouldPulse, setShouldPulse] = React.useState(false);
  const [highlightedShops, setHighlightedShops] = React.useState(
    blankShopsHighlight
  );

  const navigateToShopList = () => {
    navigation.navigate("ShopList", { ShopList: true });
  };

  const search = (text) => {
    setTextInput(text);
    const searchTerm = text.replace(/ /g, "").toLowerCase();
    const foundShops = searchTerm
      ? searchShopsTitles(searchTerm)
      : blankShopsHighlight;
    setHighlightedShops(foundShops);
    console.log(foundShops);
    handleSearchResults(
      foundShops,
      position === "right" ? LEVELS.LL : LEVELS.UL
    );
  };

  const handleSearchResults = (result: IShopSearchResult, floor: string) => {
    if (floor == LEVELS.LL) {
      setShouldPulse(result[LEVELS.UL].length > 0);
    } else if (floor === LEVELS.UL) {
      setShouldPulse(result[LEVELS.LL].length > 0);
    }
  };

  const navigateToShopId: NavToShopIdFunc = (shopkey) => {
    navigation.navigate("ShopDetails", { shopkey, ShopDetails: true });
  };

  const clearText = () => {
    setTextInput("");
    setHighlightedShops(blankShopsHighlight);
    handleSearchResults(
      blankShopsHighlight,
      position === "right" ? LEVELS.LL : LEVELS.UL
    );
  };

  const scroll = () => {
    position === "left"
      ? Animated.timing(left, {
          toValue: 0,
        }).start()
      : Animated.timing(left, {
          toValue: -width,
        }).start();
    setPosition(position === "left" ? "right" : "left");
  };

  const makeStatusBarTextBlack = (animated = true) => {
    StatusBar.setBarStyle("dark-content", animated);
  };

  useEffect(() => {
    search(textInput);
    makeStatusBarTextBlack();
  }, [position]); // make sure that button stops pulsating if needed, when changing level

  return (
    <Fragment>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.clearButton}>
          <TextInput
            underlineColorAndroid="rgba(0,0,0,0)"
            value={textInput}
            style={styles.searchInput}
            onChangeText={search}
            placeholder="Search"
          />
          <MaterialIcons
            style={styles.clearIcon}
            onPress={clearText}
            name="clear"
          />
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.mapContainer}>
            <Animated.View
              style={{
                height,
                width,
                position: "absolute",
                opacity: left.interpolate({
                  inputRange: [-width, 0],
                  outputRange: [0, 1],
                }),
                transform: [
                  { perspective: 1000 },
                  {
                    scale: left.interpolate({
                      inputRange: [-width, 0],
                      outputRange: [0, 1],
                    }),
                  },
                ],
                left: left.interpolate({
                  inputRange: [-width, -width + 1, 0],
                  outputRange: [1000, 0, 0],
                }),
              }}
            >
              <SVGMapLL
                navigateToShopId={navigateToShopId}
                highlightedShops={highlightedShops[LEVELS.LL]}
              />
            </Animated.View>
            <Animated.View
              style={{
                height,
                width,
                position: "absolute",
                opacity: left.interpolate({
                  inputRange: [-width, 0],
                  outputRange: [1, 0],
                }),
                transform: [
                  {
                    scale: left.interpolate({
                      inputRange: [-width, 0],
                      outputRange: [1, 2],
                    }),
                  },
                ],
                left: left.interpolate({
                  inputRange: [-width, -1, 0],
                  outputRange: [0, 0, 1000],
                }),
              }}
            >
              <SVGMapUL
                navigateToShopId={navigateToShopId}
                highlightedShops={highlightedShops[LEVELS.UL]}
              />
            </Animated.View>
            <PulseButton
              shouldPulse={shouldPulse}
              position={position}
              onPress={scroll}
            />
          </View>
        </ScrollView>

        <View style={{ backgroundColor: colors.secondary }}>
          <Button onPress={navigateToShopList} color="white">
            Shop List
          </Button>
        </View>

        {isIos && <SafeAreaViewBottomPadding fillColor={colors.secondary} />}
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  clearButton: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    paddingLeft: 15,
    borderColor: "grey",
    borderRadius: 50,
    borderWidth: 1,
  },
  clearIcon: {
    position: "absolute",
    color: "grey",
    right: 5,
    top: 3,
    fontSize: 30,
  },
  mapContainer: {
    flexDirection: "row",
    width,
    height: height - 170,
  },
  searchInput: {
    fontSize: 20,
  },
});
