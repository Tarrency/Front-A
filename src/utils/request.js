import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    const getCookie = (val) => {
      //获取x-csrf-token字段
      var arr,
        reg = new RegExp("(^| )" + val + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    };
    config.headers["x-csrf-token"] = getCookie("csrfToken"); //请求头设置x-csrf-token字段
    // do something before request is sent

    // if (store.getters.token) {
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    // config.headers['X-Token'] = getToken()
    // }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      Message({
        message: res.message || "Error",
        type: "error",
        duration: 5 * 1000,
      });

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm(
          "You have been logged out, you can cancel to stay on this page, or log in again",
          "Confirm logout",
          {
            confirmButtonText: "Re-Login",
            cancelButtonText: "Cancel",
            type: "warning",
          }
        ).then(() => {
          store.dispatch("user/resetToken").then(() => {
            location.reload();
          });
        });
      }
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;

function func() {
  this.count = 0;
}
func.prototype.show = function () {
  console.log(this.count);
};
const son = new func();
son.show();
son.__proto__.show();
func.prototype.show();

const o = {
  a() {
    this.f = true;
  },
  a2: () => {
    this.s = true;
  },
};
let son = {};
son.__proto__ = o;
son.a();
son.a2();
console.log(o.f);
console.log(o.s);
console.log(son.f);
console.log(son.s);

class cls extends Array {
  sum() {
    return this.reduce(function reducer(acc, curr) {
      return acc + curr;
    }, 0);
  }
}
const x = new cls(3);
const y = new Array(3);
const z = cls.of(3);
console.log(x.sum());
// console.log(y.sum());
console.log(z.sum());

var one = [3, 4, 5, 6];
one.slice(1, 3);
console.log(one);

let arr1 = [4, 8, 9, 6];
let arr2 = arr1;
arr1[0] = 10;
console.log(arr1, arr2);

function sum(i) {
  var m = i + 1;
  console.log(m);
}
function sum(i) {
  var m = i + 10;
  console.log(m);
}
sum(20);

let v = "v3.4.3";
let s = v
  .slice(1, v.length)
  .split(".")
  .map((item) => {
    return parseInt(item);
  });
