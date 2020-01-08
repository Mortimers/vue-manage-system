import wx from 'weixin-js-sdk'
import axios from 'axios'
export default {
  platform: (function () {
    let u = navigator.userAgent;
    return {
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, //火狐内核
      mobile: Boolean(u.match(/AppleWebKit.*Mobile.*/)), //是否为移动终端
      ios: Boolean(u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') === -1, //是否web应该程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
      qq: u.match(/\sQQ/i) === ' qq' || u.match(/\sQQ/i) === ' QQ' //是否QQ
    };
  })(),

  setItem: function (key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
  },


  getItem: function (key) {
    return JSON.parse(localStorage.getItem(key));
  },


  omitString: function (str, len) {
    var l = len || 8;
    return str && str.length > l ? (str.substring(0, l) + '...') : str;
  },


  // 以6s为标准,6s宽375，高667
  initHtmlFontSize: function () {
    let screenWidth = window.screen.width;
    if (screenWidth > 1024) return;

    let rate = 625 / 375;
    let fs = document.body.clientWidth * rate;
    document.querySelector('html').style.fontSize = fs + '%';
  },


  // 判断是否测试环境
  isTestEnv: function () {
    return location.href.indexOf('test') !== -1 || location.href.indexOf('localhost') !== -1;
  },


  // 格式化日期
  formatDate: function (date, pattern) {
    if (!pattern) {
      pattern = 'YYYY-MM-DD hh:mm:ss';
    }
    let d = new Date(date),
      str = pattern,
      types = ['YYYY', 'MM', 'DD', 'hh', 'mm', 'ss'],
      dates = [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()];

    for (let i = 0; i < types.length; i++) {
      str = str.replace(types[i], (dates[i] < 10 ? ('0' + dates[i]) : dates[i]));
    }

    return str;
  },


  // 获取地址栏参数
  getParameter: function (param) {
    let query = window.location.search; //获取URL地址中？后的所有字符
    let iLen = param.length; //获取你的参数名称长度
    let iStart = query.indexOf(param); //获取你该参数名称的其实索引
    if (iStart === -1) { //-1为没有该参数
      return '';
    }
    iStart += iLen + 1;
    let iEnd = query.indexOf('&', iStart); //获取第二个参数的其实索引
    if (iEnd === -1) { //只有一个参数
      return query.substring(iStart); //获取单个参数的参数值
    }
    return query.substring(iStart, iEnd); //获取第二个参数的值
  },


  // 正则匹配
  regex: function (str, type) {
    switch (type) {
      case 'email':
        return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(str);
      case 'mobile':
        return /^(17[0-9]|13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|4|5|6|7|8|9])\d{8}$/.test(str);
      case 'phone':
        return /\d{3}-\d{8}|\d{4}-\d{7}/.test(str);
      case 'username':
        return /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/.test(str); //字母开头，允许5-16字节，允许字母数字下划线
      case 'password':
        return /^\w{6,20}$/.test(str); //字母开头，长度在6-20之间，只能包含字母、数字、下划线
      case 'nickname':
        return /^[\u4E00-\u9FA5A-Za-z0-9]+$/.test(str);
      case 'idcard':
        return /^\d{15}|\d{18}$/.test(str);
      case 'qq':
        return /[1-9][0-9]{4,}/.test(str);
      case 'url':
        return;
      case 'cn':
        return /^[\u4e00-\u9fa5]{2,}$/.test(str);
      case 'verifyCode':
        return /^\w{6}$/.test(str);
      default:
        return '';
    }
  },

  isType(val,type){
    let str =Object.prototype.toString.call(val)
    let typeStr = str.slice(8,str.length-1)
    
    return type == typeStr
    
  },

  // 判断是否是微信
  isWeiXin: function () {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) === 'micromessenger') {
      return true;
    } else {
      return false;
    }
    // return true;
  },
  /*上传cdn的图片地址封装*/
  getCdnImg(result){
    if(location.origin.indexOf('test')>-1){
      /*测试环境上传cdn地址*/
      return 'https://r.moguyun.com/'+result;
      // return 'https://mgtest-img.oss-cn-shenzhen.aliyuncs.com/'+result;
    }else{
      /*线上上传cdn地址*/
      return 'https://r.moguyun.com/'+result;
    }
  }
}
