import React from "react";
import { StatusBar, YellowBox } from "react-native";
import Routes from "./src/routes";

export default function App() {
  YellowBox.ignoreWarnings(["Unrecognized WebSocket"]);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7d40e7" />
      <Routes />
    </>
  );
}
