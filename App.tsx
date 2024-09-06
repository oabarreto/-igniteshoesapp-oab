import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { NotificationClickEvent, OneSignal } from "react-native-onesignal";

import { Routes } from "./src/routes";

import { THEME } from "./src/theme";
import { Loading } from "./src/components/Loading";

import { CartContextProvider } from "./src/contexts/CartContext";
import { tagUserInfoCreate } from "./src/notifications/notificationsTags";
import { useEffect } from "react";

OneSignal.initialize("bba17935-088c-47ac-9a16-57ccc5ef05bd");
OneSignal.Notifications.requestPermission(true);

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate("devinho@email.com", "Devinho");

  useEffect(() => {
    const handleNotificationClick = (event: NotificationClickEvent): void => {
      const { actionId } = event.result;

      if (actionId === "1") {
        //open_product_details
        return console.log("Opção 1");
      }

      if (actionId === "2") {
        return console.log("Opção 2");
      }
    };

    OneSignal.Notifications.addEventListener("click", handleNotificationClick);

    return () => {
      OneSignal.Notifications.removeEventListener(
        "click",
        handleNotificationClick
      );
    };
  }, []);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}
