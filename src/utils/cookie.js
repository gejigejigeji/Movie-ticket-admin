/**
 * 设置cookie
 * @param {[type]} key   [键名]
 * @param {[type]} value [键值]
 * @param {[type]} days  [保存的时间（天）]
 */

export  function setCookie (key, value, days) {
    // 设置过期原则
    if (!value) {
        localStorage.removeItem(key)
    } else {
        var Days = days || 7; // 默认保留7天
        var exp = new Date();
        localStorage[key] = JSON.stringify({
            value,
            expires: exp.getTime() + Days * 24 * 60 * 60 * 1000
        })
    }
}
export  function getCookie (name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}