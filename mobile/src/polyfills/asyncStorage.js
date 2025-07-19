// src/polyfills/asyncStorage.js
import AsyncStorage from "@react-native-async-storage/async-storage";

if (typeof global.localStorage !== "undefined") {
  AsyncStorage.setItem = async (key, value) => {
    localStorage.setItem(key, value);
  };
  AsyncStorage.getItem = async (key) => {
    return localStorage.getItem(key);
  };
  AsyncStorage.removeItem = async (key) => {
    localStorage.removeItem(key);
  };
}
