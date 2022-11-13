import request from "@/utils/nlprequest";

export function getJDNLP(data) {
    return request({
      url: "/jdnlp",
      method: "post",
      data,
    });
  }

  export function getWBNLP(data) {
    return request({
      url: "/wbnlp",
      method: "post",
      data,
    });
  }