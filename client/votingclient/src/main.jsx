import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import {   ThirdwebProvider,  metamaskWallet,  coinbaseWallet, } from "@thirdweb-dev/react";
import "./styles/globals.css";
import Notification from "./firebase/Notification";

const activeChain = "localhost";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={activeChain} 
      supportedWallets={[
        metamaskWallet({ recommended: true }),
        coinbaseWallet(),
      ]}
       clientId="1e62bb20d56ec36e5692fd4a4f48549e">
      <App />
      <Notification/>
    </ThirdwebProvider>
  </React.StrictMode>
);
