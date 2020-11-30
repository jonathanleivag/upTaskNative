import React, { useEffect, useState, Fragment } from "react";
import { RoutesApp } from "./src/components/routes/RoutesApp";
// navigations
import "react-native-gesture-handler";

// fonts
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

// apollo
import { ApolloProvider } from "@apollo/client";
import { client } from "./src/config/apollo";

// nativeBase
import { Root } from "native-base";

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    componentDidMount();
  }, [isReady]);

  const componentDidMount = async () => {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    setIsReady(true);
  };

  return (
    <Fragment>
      {isReady ? (
        <Root>
          <ApolloProvider client={client}>
            <RoutesApp />
          </ApolloProvider>
        </Root>
      ) : null}
    </Fragment>
  );
}
