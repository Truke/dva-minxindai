import request from '../utils/request';
import api from '../utils/api'


export function fetchHomeBanners(data) {
  return request(api.banner, data);
}

export function fetchHomeList(data) {
  return request(api.newFindHomePageRecommand, data);
}

export function fetchInvestsCondition(data) {
  return request(api.findConditionList, data)
}

export function fetchInvestsList(data) {
  return request(api.findBorrowListPag, data)
}