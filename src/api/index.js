import request from '@/utils/request'



// 获取轮播图数据
export function getSwiperList() {
  return request({
    url: 'http://127.0.0.1:8088/v1/carousels/getAllCarousels', // 更新后的后端接口路径
    method: 'get',
  }).then(response => {
    console.log('API request successful:', response); // 打印API请求成功的响应
    return response;
  }).catch(error => {
    console.error('API request failed:', error); // 打印API请求失败的错误
    throw error;
  });
}

// 获取gps坐标
export function getList (params) {
  return request({
    url: '/api-task/gps/tracks/getMessageBySn',
    method: 'get',
    params
  })
}



/* 我的订单 */
export function getMyOrder (params) {
  return request({
    url: '/api-task/gpsOrder/getBaseMessage',
    method: 'get',
    params
  })
}
/* 订单详情 */
export function getOrderDetail (id) {
  return request({
    url: `/api-task/gpsOrder/getOrderDetail/${id}`,
    method: 'get',
  })
}

/* 下单 */
export function addGpsOrder (data) {
  return request({
    url: '/api-task/gpsOrder/insert',
    method: 'post',
    data
  })
}
/* 我的设备 */
export function getMyGps (params) {
  return request({
    url: '/api-task/gpsOrder/getAllGpsMessage',
    method: 'get',
    params
  })
}



