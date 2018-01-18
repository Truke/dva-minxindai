import request from '../utils/request'
import api from '../utils/api'

//首页banner
export function banner(data) {
  return request(api.banner, data);
}
//首页推荐标
export function newFindHomePageRecommand(data) {
  return request(api.newFindHomePageRecommand, data);
}
//投资页类目
export function findConditionList(data) {
  return request(api.findConditionList, data)
}
//投资列表
export function findBorrowListPag(data) {
  return request(api.findBorrowListPag, data)
}
//存管标标状态
export function checkBorrowStatus(data) {
  return request(api.checkBorrowStatus, data)
}
//非存管标标状态
export function checkBorrowSetStatus(data) {
  return request(api.checkBorrowSetStatus, data)
}
//存管标详情
export function findBorrowInfo(data) {
  return request(api.findBorrowInfo, data)
}
//非存管标详情
export function findBorrowSetInfo(data) {
  return request(api.findBorrowSetInfo, data)
}

