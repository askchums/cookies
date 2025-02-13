/**
 * Copyright (c) Joseph P. Ferraro
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file here: https://github.com/joeferraro/react-native-cookies/blob/master/LICENSE.md.
 */

import { NativeModules, Platform } from 'react-native';
const invariant = require('invariant');
const RNCookieManagerIOS = NativeModules.RNCookieManagerIOS;
const RNCookieManagerAndroid = NativeModules.RNCookieManagerAndroid;

let CookieManager;

if (Platform.OS === 'ios') {
  invariant(
    RNCookieManagerIOS,
    '@react-native-community/cookies: Add RNCookieManagerIOS.h and RNCookieManagerIOS.m to your Xcode project',
  );
  CookieManager = RNCookieManagerIOS;
} else if (Platform.OS === 'android') {
  invariant(
    RNCookieManagerAndroid,
    '@react-native-community/cookies: Import libraries to android "react-native link @react-native-community/cookies"',
  );
  CookieManager = RNCookieManagerAndroid;
} else {
  invariant(
    CookieManager,
    '@react-native-community/cookies: Invalid platform. This library only supports Android and iOS.',
  );
}

const functions = ['setFromResponse', 'getFromResponse'];

module.exports = {
  getAll: (useWebKit = false, groupContainerIdentifier = null) =>
    CookieManager.getAll(useWebKit, groupContainerIdentifier),
  clearAll: (useWebKit = false, groupContainerIdentifier = null) =>
    CookieManager.clearAll(useWebKit, groupContainerIdentifier),
  get: (url, useWebKit = false, groupContainerIdentifier = null) =>
    CookieManager.get(url, useWebKit, groupContainerIdentifier),
  set: (url, cookie, useWebKit = false, groupContainerIdentifier = null) =>
    CookieManager.set(url, cookie, useWebKit, groupContainerIdentifier),
  clearByName: (
    url,
    name,
    useWebKit = false,
    groupContainerIdentifier = null,
  ) =>
    CookieManager.clearByName(url, name, useWebKit, groupContainerIdentifier),
  flush: async () => {
    if (Platform.OS === 'android') {
      await CookieManager.flush();
    }
  },
};

for (var i = 0; i < functions.length; i++) {
  module.exports[functions[i]] = CookieManager[functions[i]];
}
