const {Cc, Cu, Ci, Cr} = require('chrome');

var observerService = Cc["@mozilla.org/observer-service;1"]
    .getService(Ci.nsIObserverService);

var httpRequestObserver = {
  observe: function(aSubject, aTopic, aData) {
      if (aTopic == "http-on-modify-request") {
        console.dir([].slice.call(arguments));
      }
  },
  QueryInterface : function (aIID) {
    if (aIID.equals(Ci.nsIObserver) || aIID.equals(Ci.nsISupports)) {
        return this;
    }

    throw Cr.NS_NOINTERFACE;
  }
};

observerService.addObserver(httpRequestObserver, "http-on-modify-request", false);

exports.onUnload = function(reason) {
  observerService.removeObserver(
    httpRequestObserver, 
    "http-on-examine-response"
  );
}
