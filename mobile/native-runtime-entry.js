import { Capacitor } from "@capacitor/core";
import { Purchases } from "@revenuecat/purchases-capacitor";
import { RevenueCatUI } from "@revenuecat/purchases-capacitor-ui";

const platform=Capacitor.getPlatform();
const native=Capacitor.isNativePlatform();

globalThis.GSC_NATIVE_PLATFORM=native?platform:"";
globalThis.GSC_API_ORIGIN=native?__GSC_API_ORIGIN__:"";
globalThis.GSC_NATIVE_PURCHASES=native?Purchases:null;
globalThis.GSC_NATIVE_PAYWALL=native?RevenueCatUI:null;
globalThis.GSC_COMMERCE_CONFIG={
  iosApiKey:__GSC_REVENUECAT_IOS_PUBLIC_KEY__,
  androidApiKey:__GSC_REVENUECAT_ANDROID_PUBLIC_KEY__
};

globalThis.dispatchEvent(new CustomEvent("gsc-native-ready",{detail:{native,platform}}));
