; (function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? module.exports = factory(global)
    : typeof define === 'function' && define.amd
      ? define(factory) : factory(global)
}((
  typeof self !== 'undefined' ? self
    : typeof window !== 'undefined' ? window
      : typeof global !== 'undefined' ? global
        : this
), function (global) {

  var Partner = global.Partner || {};
  var emptyFunc = function () { }

  Object.setPrototypeOf = Object.setPrototypeOf || function (obj, proto) {
    obj.__proto__ = proto;
    return obj;
  }

  Partner.toastCallback = null;
  Partner.userInfo = {};

  Partner.extends = function () {
    var obj = {};
    Object.setPrototypeOf(obj, Partner)
    obj.super = Partner;
    return obj;
  };

  Partner.onShow = function (callback) {
    console.log("====");
    callback({});
  }

  Partner.isWeChat = function () {
    return false;
  }



  Partner.postMessage = function (args) {
    console.log("########postMessage:", args);
  }

  Partner.showShareMenu = function (options) {
    console.log("########showShareMenu:", options);
  }
  Partner.onShareAppMessage = function (callback) {
    console.log('-------onShareAppMessage');
    callback();
  }
  Partner.shareAppMessage = function (options) {
    console.log('-------shareAppMessage', options);
  }
  Partner.getOpenDataContext = function () {
    console.log('-------getOpenDataContext');
    return wx.getOpenDataContext();
  }
  Partner.vibrateLong = function (options) {
    console.log('-------vibrateLong', options);
  }

  Partner.createInnerAudioContext = function () {
    console.log('-------createInnerAudioContext');
    return wx.createInnerAudioContext();
  }
  Partner.requestPost = function (url,data,callback) {
    console.log(url);
  }
  Partner.requestGet = function (url,data,callback) {
    console.log(url);
  }
  Partner.previewImg = function(params){
    console.log(params);
  }

  Partner.getSysInfo = function(){
    return wx.getSystemInfoSync()
  }

  Partner.toTempFilePathSync = function(callBack){
    callBack(canvas.toTempFilePathSync());
  }

  Partner.navigateToMiniProgram = function(appid) {
    console.log(appid);
  }

  Partner.getSize = function() {
    var tWidth = document.documentElement.clientWidth;
    var tHeight = document.documentElement.clientHeight;
    return {width: tWidth, height: tHeight};
  }

  global.Partner = Partner;
}));
