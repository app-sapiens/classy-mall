import React, { Fragment } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { SHOP_LIST } from '../constants/shopList';
import Header from './Header'


const { width, height } = Dimensions.get("window");
import theme from "./theme";

import { Button, IconButton } from "react-native-paper";

const PADDING = 40;
const INDICATOR_CONTAINER_HEIGHT = 2;
const INDICATOR_CONTAINER_WIDTH = width - PADDING * 2;
const INDICATOR_WIDTH =
  INDICATOR_CONTAINER_WIDTH / Object.keys(SHOP_LIST).length;

export const ShopList = ({ navigation }) => {
  let textInput = React.useRef();
  const [viewType, setViewType] = React.useState("cards");
  const [searchQuery, setSearchQuery] = React.useState("");
  // const [indicator] = React.useState(new Animated.Value(0));
  const [scrollX] = React.useState(new Animated.Value(0));

  const goBack = () => {
    navigation.goBack();
  };

  const clearText = () => {
    textInput.setNativeProps({ text: "" });
    setSearchQuery("")
  };

  const onShopSelect = shopkey => {
    navigation.navigate("ShopDetails", { shopkey });
  };

  const renderCard = (shop, i) => {
    let inputRange = [
      (i - 1) * width,
      i * width,
      (i + 1) * width,
      (i + 2) * width
    ];

    return (
      <View style={[theme.container, ss.shopItem]} key={i}>
        <Animated.View style={[ss.innerContainer, { paddingTop: 130 },
        {
          transform: [
            {
              scale: scrollX.interpolate({
                inputRange,
                outputRange: [0.3, 1, 0.3, 0.3]
              })
            }
          ]
        }]}>
          <View
            style={{ width: width - 80, height: "100%" }}
          >
            <Image
              source={
                typeof shop.image == "string" ? { uri: shop.image } : shop.image
              }
              style={[
                {
                  width: "100%",
                  height: "100%",
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                }
              ]}
            />
          </View>
          <Text
            style={[
              theme.title,
              { margin: 20 }
            ]}
          >
            {shop.title}
          </Text>

          {renderShopFooter(shop.key, i)}
        </Animated.View>
      </View>
    );
  };

  const renderRow = (shop, i) => {
    return (
      <TouchableHighlight key={i} onPress={() => onShopSelect(shop.key)}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "lightgrey",
            width: width - 6,
            marginHorizontal: 3,
            marginVertical: 1
          }}
        >
          <Image
            source={
              typeof shop.image == "string" ? { uri: shop.image } : shop.image
            }
            style={{ height: 40, width: 40, borderRadius: 20, marginLeft: 20 }}
          />
          <Text
            style={[
              // theme.customFont,
              theme.title,
              { margin: 20 }
            ]}
          >
            {shop.title}
          </Text>
        </View>
      </TouchableHighlight>
    );
  };

  const renderShopFooter = (shopkey, i) => {
    return (
      <View key={i} style={[theme.groupButton, ss.footer]}>
        <Button
          onPress={() => onShopSelect(shopkey)}
          color="black"
          mode="contained"
        >
          View Details
        </Button>
      </View>
    );
  };

  return (
    <Fragment>
      <Header
        navigation={navigation}
        viewType={viewType}
        setViewType={setViewType}
        shopListScreen={true} />
      <View style={[theme.container, theme.bg, { paddingBottom: 30 }]}>
        {viewType == "cards" ? (
          <Animated.ScrollView
            pagingEnabled
            scrollEventThrottle={16}
            contentContainerStyle={[ss.contentContainer]}
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
          >
            {Object.keys(SHOP_LIST).map((shop, index) => {
              return renderCard(SHOP_LIST[shop], index)
            }
            )}
          </Animated.ScrollView>
        ) : (
            <View >
              <View
                style={{
                  marginTop: 8,
                  marginBottom: 8,
                  marginLeft: 16,
                  marginRight: 16,
                  padding: 5,
                  paddingLeft: 15,
                  borderColor: "grey",
                  borderRadius: 50,
                  borderWidth: 1
                }}
              >
                {/* TODO refactor TextInput to a controlled component */}
                <TextInput
                  underlineColorAndroid="rgba(0,0,0,0)"
                  ref={component => (textInput = component)}
                  style={{ fontSize: 20 }}
                  onChangeText={e =>
                    setSearchQuery(e.replace(/ /g, "").toLowerCase())
                  }
                  placeholder="Search"
                />
                <IconButton
                  color='grey'
                  style={{
                    position: "absolute",
                    right: 0,
                    top: -5,
                    marginBottom: 30
                  }}
                  onPress={clearText}
                  icon="clear"
                />
              </View>
              <ScrollView style={{ width: width }}>
                {Object.keys(SHOP_LIST)
                  .filter(name => {
                    return name.includes(searchQuery);
                  })
                  .map((shop, index) => renderRow(SHOP_LIST[shop], index))}
              </ScrollView>
            </View>
          )}
        {/* {viewType == "cards" ? (
          <Animated.View style={ss.indicatorContainer}>
            <Animated.View style={[ss.indicator, { left: indicator }]} />
          </Animated.View>
        ) : null} */}
      </View>
    </Fragment>
  );
};

// export default class ShopList extends React.Component {
//   constructor(props, context) {
//     super(props, context);

//     this.state = {
//       selectedId: 0,
//       scrollX: new Animated.Value(0),
//       indicator: new Animated.Value(1),
//       viewType: "cards",
//       searchQuery: ""
//     };
//   }

//   render() {
//     return (
//       <View style={[theme.container, theme.bg]}>
//         {this.state.viewType == "cards" ? (
//           <Animated.ScrollView
//             pagingEnabled
//             scrollEventThrottle={16}
//             contentContainerStyle={[ss.contentContainer]}
//             horizontal={true}
//             showsHorizontalScrollIndicator={false}
//             onScroll={Animated.event(
//               [{ nativeEvent: { contentOffset: { x: this.state.scrollX } } }],
//               { useNativeDriver: true }
//             )}
//           >
//             {Object.keys(SHOP_LIST).map((shop, index) =>
//               this._renderCard(SHOP_LIST[shop], index)
//             )}
//           </Animated.ScrollView>
//         ) : (
//           <View style={{ height: height - 124 }}>
//             <View
//               style={{
//                 marginTop: 8,
//                 marginLeft: 10,
//                 marginRight: 100,
//                 padding: 5,
//                 paddingLeft: 15,
//                 borderColor: "grey",
//                 borderRadius: 50,
//                 borderWidth: 1
//               }}
//             >
//               <TextInput
//                 underlineColorAndroid="rgba(0,0,0,0)"
//                 ref={component => (this._textInput = component)}
//                 style={{ fontSize: 20 }}
//                 onChangeText={e => {
//                   this.setState({
//                     searchQuery: e.replace(/ /g, "").toLowerCase()
//                   });
//                 }}
//                 placeholder="Search"
//               />
//               <IconButton
//                 style={{
//                   position: "absolute",
//                   color: "grey",
//                   right: 5,
//                   top: 4,
//                   fontSize: 30
//                 }}
//                 onPress={this.clearText}
//                 icon="clear"
//               />
//             </View>
//             <ScrollView style={{ width: width }}>
//               {Object.keys(SHOP_LIST)
//                 .filter(name => {
//                   return name.includes(this.state.searchQuery);
//                 })
//                 .map((shop, index) => this._renderRow(SHOP_LIST[shop], index))}
//             </ScrollView>
//           </View>
//         )}
//         <IconButton
//           style={ss.addButton}
//           icon={this.state.viewType == "cards" ? "list" : "view-carousel"}
//           onPress={() => {
//             this.setState({
//               viewType: this.state.viewType == "cards" ? "list" : "cards"
//             });
//           }}
//           size={30}
//           color="white"
//         />
//         {this.state.viewType == "cards" ? (
//           <Animated.View style={ss.indicatorContainer}>
//             <Animated.View
//               style={[ss.indicator, { left: this.state.indicator }]}
//             />
//           </Animated.View>
//         ) : null}
//         {this._renderPageFooter()}
//       </View>
//     );
//   }

//   componentDidMount() {
//     this.state.scrollX.addListener(this.updateView.bind(this));
//   }

//   updateView(offset) {
//     let currentIndex = offset.value / width;
//     if (offset.value < 0) {
//       currentIndex = 0;
//     } else if (offset.value > (Object.keys(SHOP_LIST).length - 1) * width) {
//       currentIndex = Object.keys(SHOP_LIST).length - 1;
//     }

//     this.state.indicator.setValue(currentIndex * INDICATOR_WIDTH);
//   }

//   _renderCard(shop, i) {
//     let inputRange = [
//       (i - 1) * width,
//       i * width,
//       (i + 1) * width,
//       (i + 2) * width
//     ];

//     return (
//       <View style={[theme.container, ss.shopItem]} key={i}>
//         <View style={ss.innerContainer}>
//           <Animated.Image
//             source={
//               typeof shop.image == "string" ? { uri: shop.image } : shop.image
//             }
//             style={[
//               theme.image,
//               {
//                 transform: [
//                   {
//                     scale: this.state.scrollX.interpolate({
//                       inputRange,
//                       outputRange: [0.3, 1, 0.3, 0.3]
//                     })
//                   }
//                 ]
//               }
//             ]}
//           />
//           <Text
//             style={[
//               // theme.customFont,
//               theme.title,
//               { margin: 20 }
//             ]}
//           >
//             {shop.title}
//           </Text>

//           {this._renderShopFooter(shop.key, i)}
//         </View>
//       </View>
//     );
//   }

//   _renderRow(shop, i) {
//     return (
//       <TouchableHighlight key={i} onPress={() => this.onShopSelect(shop.key)}>
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             borderRadius: 5,
//             borderWidth: 1,
//             borderColor: "lightgrey",
//             width: width - 6,
//             marginHorizontal: 3,
//             marginVertical: 1
//           }}
//         >
//           <Image
//             source={
//               typeof shop.image == "string" ? { uri: shop.image } : shop.image
//             }
//             style={{ height: 40, width: 40, borderRadius: 20, marginLeft: 20 }}
//           />
//           <Text
//             style={[
//               // theme.customFont,
//               theme.title,
//               { margin: 20 }
//             ]}
//           >
//             {shop.title}
//           </Text>
//         </View>
//       </TouchableHighlight>
//     );
//   }
//   //   <Components.LinearGradient
//   //             colors={['#e6e6e6', 'white', 'white', '#e6e6e6']}
//   //             style={{flexDirection:'row', alignItems: 'center'}}>
//   // </Components.LinearGradient>

//   _renderShopFooter(shopkey, i) {
//     return (
//       <View key={i} style={[theme.groupButton, ss.footer]}>
//         <Button
//           onPress={() => this.onShopSelect(shopkey)}
//           color="black"
//           mode="contained"
//         >
//           View Details
//         </Button>
//       </View>
//     );
//   }

//   _renderPageFooter() {
//     return (
//       <View style={[theme.groupButton, ss.footer]}>
//         <Button onPress={() => this.goBack()} color="black" mode="contained">
//           Return to Map
//         </Button>
//       </View>
//     );
//   }

//   goBack() {
//     this.props.navigation.goBack();
//   }

//   onShopSelect(shopkey) {
//     this.props.navigation.navigate("ShopDetails", { shopkey });
//   }
// }

const ss = StyleSheet.create({
  addButton: {
    backgroundColor: "#3cbc8d",
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    right: 0,
    shadowColor: "#000000",
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 6,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  innerContainer: {
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0
    },
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "flex-end",
    width: '100%',
    height: '100%',
    backgroundColor: "#ffffff"
  },
  shopItem: {
    width: width ,
    padding: 40,
  },
  footer: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    overflow: "hidden",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    marginBottom: 30
  },
  indicator: {
    width: INDICATOR_WIDTH,
    height: INDICATOR_CONTAINER_HEIGHT,
    position: "absolute",
    top: 0,
    backgroundColor: "#c0c0c0"
  },
  indicatorContainer: {
    height: INDICATOR_CONTAINER_HEIGHT,
    marginVertical: 20,
    // backgroundColor: "red",
    // backgroundColor: "#ededed",
    position: "relative",
    width: INDICATOR_CONTAINER_WIDTH,
    paddingHorizontal: PADDING
  }
});
