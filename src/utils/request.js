import fetch from 'dva/fetch';
import md5 from 'md5'

const KEY = 'CHINESE_M#!@_2342##@1%@#$@%1121^$%$'

const json2String = (jsonData) => {
    let strArr = [];
    for (let k in jsonData) {
        if (typeof jsonData[k] === 'object') {
            json2String(jsonData[k])
        } else {
            strArr.push(k + "=" + jsonData[k]);
        }
    }
    strArr.sort()
    return strArr.join("&");
}


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
async function request(url, options) {
  let str = json2String(options)
  let mxd = md5(url + '?' + str + KEY)
  const response = await fetch('/api/' + url, {
    method: 'post',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: str + '&mxd=' + mxd,
  })

  checkStatus(response);

  const data = await response.json();

  const ret = {
    data,
    headers: {},
  };

  return ret;
}

export default request;
