(function () {
    "use strict";

  var remainingAttempts = 10;

  function waitForAndCallHandlerFunction(url) {
    console.log("get excuted in JS triggerOpenURL 1")
    if (typeof window.handleOpenURL === "function") {
      // Clear the intent when we have a handler (note that this is only done when the preference 'CustomURLSchemePluginClearsAndroidIntent' is 'true' in config.xml
      cordova.exec(
          null,
          null,
          "LaunchMyApp",
          "clearIntent",
          []);
      console.log("get excuted in JS triggerOpenURL 2")
      window.handleOpenURL(url);
    } else if (remainingAttempts-- > 0) {
      setTimeout(function(){waitForAndCallHandlerFunction(url);}, 500);
    }
  }

  function triggerOpenURL() {
    console.log("get excuted in JS triggerOpenURL 3")
    cordova.exec(
        waitForAndCallHandlerFunction,
        null,
        "LaunchMyApp",
        "checkIntent",
        []);
  }

  document.addEventListener("deviceready", triggerOpenURL, false);
  document.addEventListener("resume", triggerOpenURL, false);

  var launchmyapp = {
    getLastIntent: function(success, failure) {
      cordova.exec(
        success,
        failure,
        "LaunchMyApp",
        "getLastIntent",
        []);
    }
  }

  getLastIntent: function(success, failure) {
    cordova.exec(
      success,
      failure,
      "LaunchMyApp",
      "getLastIntent",
      []);
  }

  module.exports = launchmyapp;

}());
