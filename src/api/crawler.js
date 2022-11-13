import request from "@/utils/request";

export function crawler(data) {
  return request({
    url: "/product/crawler",
    method: "post",
    data,
  });
}

export function crawlerWB(data) {
    return request({
      url: "/product/crawlerWB",
      method: "post",
      data,
    });
  }

export function getProductList(data) {
    return request({
      url: "/product/list",
      method: "post",
      data,
    });
  }

  export function getCommentList(data) {
    return request({
      url: "/comment/list",
      method: "post",
      data,
    });
  }