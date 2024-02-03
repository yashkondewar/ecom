import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./store";
import { ColorModeSwitcher } from "./components/layout/colorSwitcher";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <Provider store={store}>
      <ColorModeSwitcher zIndex={"10"} />
      <App />
    </Provider>
  </ChakraProvider>
);
