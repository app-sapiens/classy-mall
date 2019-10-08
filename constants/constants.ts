import { ShopList } from "../types/types";

export const LEVELS: { UL: string; LL: string } = {
  LL: "LL",
  UL: "UL"
};

export const LEVEL_VALUES = Object.values(LEVELS);

export const SHOP_LIST: ShopList = {
  orangecafe: {
    key: "orangecafe",
    image: require("../img/promos/orange/main.jpg"),
    title: "Orange Cafe",
    openingHours: {
      Monday: "9am–5pm",
      Tuesday: "9am–6pm",
      Wednesday: "9:30am–6pm",
      Thursday: "9am–6pm",
      Friday: "9am–7pm",
      Saturday: "9am–6pm",
      Sunday: "Closed"
    },
    description: "Oranges for everyone, a great source of vitamin C",
    rating: 3,
    promos: [
      require("../img/promos/orange/1.jpg"),
      require("../img/promos/orange/2.jpg"),
      require("../img/promos/orange/3.jpg")
    ],
    atLevels: [LEVELS.LL, LEVELS.UL]
  },
  tattooparlour: {
    key: "tattooparlour",
    image: require("../img/promos/tattoo/main.jpg"),
    title: "Tattoo Parlour",
    openingHours: {
      Monday: "9am–5pm",
      Tuesday: "9am–6pm",
      Wednesday: "9:30am–6pm",
      Thursday: "9am–6pm",
      Friday: "9am–7pm",
      Saturday: "9am–6pm",
      Sunday: "Closed"
    },
    description: "Tattoo Parlour, great colours and lines ",
    rating: 3,
    atLevels: [LEVELS.LL]
  },
  gardenshops: {
    key: "gardenshops",
    image: require("../img/promos/garden/main.jpg"),
    title: "Garden Shops",
    openingHours: {
      Monday: "9am–5pm",
      Tuesday: "9am–6pm",
      Wednesday: "9:30am–6pm",
      Thursday: "9am–6pm",
      Friday: "9am–7pm",
      Saturday: "9am–6pm",
      Sunday: "Closed"
    },
    description: "Create the yard and garden of your dreams.",
    rating: 3,
    atLevels: [LEVELS.LL]
  },
  floraver21: {
    key: "floraver21",
    image: require("../img/promos/flower/main.jpg"),
    title: "Floraver 21",
    openingHours: {
      Monday: "9am–5pm",
      Tuesday: "9am–6pm",
      Wednesday: "9:30am–6pm",
      Thursday: "9am–6pm",
      Friday: "9am–7pm",
      Saturday: "9am–6pm",
      Sunday: "Closed"
    },
    description:
      "Floraver 21 is the authority on flowers & the go-to florist for the latest trends, must-have bouquets & the hottest deals.",
    rating: 3,
    atLevels: [LEVELS.LL]
  },
  foodcourt: {
    key: "foodcourt",
    image: require("../img/promos/foodcourt/main.jpg"),
    title: "Food Court",
    openingHours: {
      Monday: "9am–5pm",
      Tuesday: "9am–6pm",
      Wednesday: "9:30am–6pm",
      Thursday: "9am–6pm",
      Friday: "9am–7pm",
      Saturday: "9am–6pm",
      Sunday: "Closed"
    },
    description: "",
    rating: 3,
    atLevels: [LEVELS.LL]
  },
  wonderland: {
    key: "wonderland",
    image: require("../img/square.png"),
    title: "Wonderland",
    openingHours: {
      Monday: "9am–5pm",
      Tuesday: "9am–6pm",
      Wednesday: "9:30am–6pm",
      Thursday: "9am–6pm",
      Friday: "9am–7pm",
      Saturday: "9am–6pm",
      Sunday: "Closed"
    },
    description: "",
    rating: 3,
    atLevels: [LEVELS.LL]
  },
  shoes: {
    key: "shoes",
    image: require("../img/promos/shoes/main.jpg"),
    title: "Shoes!",
    openingHours: {
      Monday: "9am–5pm",
      Tuesday: "9am–6pm",
      Wednesday: "9:30am–6pm",
      Thursday: "9am–6pm",
      Friday: "9am–7pm",
      Saturday: "9am–6pm",
      Sunday: "Closed"
    },
    description: "Shoes!",
    rating: 3,
    atLevels: [LEVELS.LL]
  },
  bikeshop: {
    key: "bikeshop",
    image: require("../img/promos/bike/main.jpg"),
    title: "Bike shop",
    openingHours: {
      Monday: "9am–5pm",
      Tuesday: "9am–6pm",
      Wednesday: "9:30am–6pm",
      Thursday: "9am–6pm",
      Friday: "9am–7pm",
      Saturday: "9am–6pm",
      Sunday: "Closed"
    },
    description: "Tools, wheels and bikes",
    rating: 3,
    promos: [
      require("../img/promos/bike/1.jpg"),
      require("../img/promos/bike/2.jpg")
    ],
    atLevels: [LEVELS.LL]
  },
  babies: {
    key: "babies",
    image: require("../img/promos/babies/main.jpg"),
    title: "Babies",
    openingHours: {
      Monday: "9am–5pm",
      Tuesday: "9am–6pm",
      Wednesday: "9:30am–6pm",
      Thursday: "9am–6pm",
      Friday: "9am–7pm",
      Saturday: "9am–6pm",
      Sunday: "Closed"
    },
    description: "Please we are not prepared for the new borns",
    rating: 3,
    atLevels: [LEVELS.LL, , LEVELS.UL]
  },
  tea: {
    key: "tea",
    image: require("../img/promos/tea/main.jpg"),
    title: "Tea me meet again",
    openingHours: {
      Monday: "9am–5pm",
      Tuesday: "9am–6pm",
      Wednesday: "9:30am–6pm",
      Thursday: "9am–6pm",
      Friday: "9am–7pm",
      Saturday: "9am–6pm",
      Sunday: "Closed"
    },
    description: "Catch up and have a cup of tea",
    rating: 3,
    atLevels: [LEVELS.LL, LEVELS.UL]
  },
  artsncrafts: {
    key: "artsncrafts",
    image: require("../img/promos/art/main.jpg"),
    title: "Arts n Craft",
    openingHours: {
      Monday: "9am–5pm",
      Tuesday: "9am–6pm",
      Wednesday: "9:30am–6pm",
      Thursday: "9am–6pm",
      Friday: "9am–7pm",
      Saturday: "9am–6pm",
      Sunday: "Closed"
    },
    description:
      "Here at Arts n Craft, we have a huge range of kids' finger paints including crayons, arts & crafts, paper and more.",
    rating: 3,
    atLevels: [LEVELS.LL]
  }
};

export const SHOPS_UL = Object.values(SHOP_LIST).filter(shop =>
  shop.atLevels.includes(LEVELS.UL)
);
export const SHOPS_LL = Object.values(SHOP_LIST).filter(shop =>
  shop.atLevels.includes(LEVELS.LL)
);
