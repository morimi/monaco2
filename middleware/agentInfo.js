export default function ({ store, req }) {
  let ua =  process.server ? req.headers['user-agent'] : (typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'),
      result = {}
  ua = ua.toLowerCase();

  const _Android = () => {
    var m = ua.match(/Android ([\d\.]*);\s([\w\-]+)/i);
     result.ANDROID = true;
     if(m) {
       result.VERSION = m[1];
       result.DEVICE_NAME = m[2];
     }
  };

  const _Apple = () => {
    var m = ua.match(/.*\s\((?:iPhone|iPad|iPod); CPU (?:\w+) OS (\d+_\d+(?:_\d+)*)/i);
    if(m) {
      result.VERSION = m[1].replace(/_/ig, '.');
    }
    result.APPLE = true;
  };

  //OS
  if(ua.indexOf('android') !== -1){
    result.OS = 'android';
    result.DEVICE = 'android';
    _Android();

  } else if( ua.indexOf('iphone') !== -1 ) {
    result.OS = 'ios';
    result.DEVICE_NAME = 'iphone';
    result.DEVICE = 'ios';
    _Apple();

  } else if( ua.indexOf('ipad') !== -1 ) {
    result.OS = 'ios';
    result.DEVICE_NAME = 'ipad';
    result.DEVICE = 'ios';
    _Apple();

  } else if ( ua.indexOf('ipod') !== -1 ){
    result.OS = 'ios';
    result.DEVICE_NAME = 'ipod';
    result.DEVICE = 'ios';
    _Apple();

  } else { //PC用ブラウザ
    var m = ua.match(/\((\w+);*/i);
    result.OS = m[1].toLowerCase();
    result.DEVICE = 'ios';
  }

  //browser----

  if (ua.indexOf('msie') != -1 || ua.indexOf('iemobile') != -1) { //IE全般
    result.BROWSER = 'ie';
  }else if (ua.indexOf('edge') != -1) { //Edge
    /**
     * Edge Mobile
     * Mozilla/5.0 (Windows Phone 10.0; Android 6.0.1; Microsoft; Lumia 950) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Mobile Safari/537.36 Edge/15.14977
     */
    result.BROWSER = 'edge';
  }else if (ua.indexOf('firefox') != -1 || ua.indexOf('fxios') != -1) { //Firefox
    /**
     * Firefox for Android
     * Mozilla/5.0 (Android 7.0; Mobile; rv:54.0) Gecko/54.0 Firefox/54.0
     * Firefox for iOS
     * Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) FxiOS/7.5b3349 Mobile/14F89 Safari/603.2.4
     */
    result.BROWSER = 'firefox';
  }else if (ua.indexOf('opera') != -1 || ua.indexOf('opios') != -1 || ua.indexOf('opr') != -1) { //Opera
    /**
     * Opera Mobile (Blink rendering engine)
     * Mozilla/5.0 (Linux; Android 7.0; SM-A310F Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.91 Mobile Safari/537.36 OPR/42.7.2246.114996
     * Opera Mini
     * Opera/9.80 (J2ME/MIDP; Opera Mini/5.1.21214/28.2725; U; ru) Presto/2.8.119 Version/11.10
     * Opera Mini (iOS WebKit)
     * Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) OPiOS/10.2.0.93022 Mobile/11D257 Safari/9537.53
     */
    result.BROWSER = 'opera';
  }else if (ua.indexOf('chrome') != -1 || ua.indexOf('crios') != -1) { //Chrome
    /**
     * Chrome Mobile
     * Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36
     * iOS Chrome
     * Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) CriOS/61.0.3163.73 Mobile/15A372 Safari/602.1
     */
    result.BROWSER = 'chrome';
  }else if (ua.indexOf('safari') != -1 && ua.indexOf('chrome') == -1) { //Safari
    if(result.OS === 'ios') {
      /**
       * Safari for iOS
       * Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1
       */
      result.BROWSER = 'safari';
    } else if(result.OS === 'android') {
      /**
       * Android Browser
       * Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; SCH-I535 Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30
       */
      result.BROWSER = 'android_browser';
    }
  } else {
    result.BROWSER = 'unknown';
  }

  result.SMARTPHONE = (result.ANDROID || result.APPLE)
    //&& ( window.innerWidth === screen.width )
    //&& (window.orientation >= 0);
  result.PLATFORM = result.SMARTPHONE ? 'sp' : 'pc';

  store.commit('setAgentInfo', result)
}
