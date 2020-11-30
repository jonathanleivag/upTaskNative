import { Platform } from "react-native";
const { ApolloClient } = require("@apollo/client");
const { InMemoryCache } = require("apollo-cache-inmemory");
const { createHttpLink } = require("apollo-link-http");
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  URI_ANDROID_DEV,
  URI_IOS_DEV,
  URI_PROD,
} from "@env";

import { setContext } from "apollo-link-context";

let uri = "";
if (process.env.NODE_ENV === "development") {
  uri = Platform.OS === "android" ? URI_ANDROID_DEV : URI_IOS_DEV;
} else {
  uri =  URI_PROD;
}

const httpLink = createHttpLink({ uri });

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("@token");
  return { headers: { ...headers, Authorization: token } };
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});
