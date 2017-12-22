
export default {
  login:"webLogin/login.mxd",//登录
  regUser:"user/saveUser.mxd",//注册
  regGetMsg:"user/findPhoneCaptcha.mxd",//根据手机号获取验证码
  regTel:"user/findPhone.mxd",//验证手机号码
  banner:"cms/findBannerImageByNodeId.mxd",//banner图
  getInvestTotal:"appUser/getInvestTotal.mxd", //首页公告
  newFindHomePageRecommand:"borrowHomePage/NewFindHomePageRecommand.mxd", //首页推荐标
  findAccountMsg:"personalInfo/findAccountMsg.mxd", //获取实名信息
  findAccountCartMsg: "app/accountCard/findAccountCartMsg.mxd",//APP存管账户绑卡信息
  openAccount:"userAccount/openAccount.mxd",//存管开户
  checkRecharge:'depositSwitch/toCheckRechargeSwitch.mxd',//检查充值开关
  findAccount:'appAccount/findAccount.mxd',//总资产明细
  getYestday:'appAccount/getYestdayIncomeInfo.mxd',//我的账户-昨日收益及明细
  getAlready:'appAccount/getAlreadyIncomeInfo.mxd',//我的账户-累计收益及明细
  availableLog:'accountLog/findAppAccountLog.mxd',//我的-可用余额金额明细
  availableLogcg:'app/userAccountLog/findAppAccountLog.mxd',//存管可用金额明细
  userBankBefore:'userBankCard/findBankCardsInfo.mxd',//我的银行卡，解绑银行卡展示银行卡信息
  modifyPassword: 'user/modifyPassword.mxd',//修改登录密码
  verifyUserNameCardNoAndCaptcha: 'authApp/verifyUserNameCardNoAndCaptcha.mxd',//验证用户名、身份证号、验证码是否通过
  setTransPwdH5: 'userTransPwd/setTransPwdH5.mxd',//开户设置密码
  checkPayPassword: 'userPayPW/checkPayPassword.mxd',//旧账户是否设置了交易密码
  changePayPassword: 'userPayPW/changePayPassword.mxd',//旧账户修改交易密码
  findBorrowListPag: "borrowApp/newFindBorrowListPag.mxd",//投资列表
  findConditionList: "borrowApp/findConditionList.mxd",//投资列表筛选产品
  findBorrowInfo: "borrow/findBorrowInfo.mxd",//优选标详情
  checkBorrowStatus: 'borrow/checkBorrowStatus.mxd',//检查优选标状态
  findBorrowSetInfo: "appBorrowSet/findBorrowSetInfo.mxd",//VIP标详情
  checkBorrowSetStatus: "appBorrowSet/checkBorrowSetStatus.mxd",//检查VIP标状态
  getRespectIncome: 'invest/getRespectIncome.mxd',//预期收益计算
  getBasicDetailState: 'borrowApp/getBasicDetailState.mxd',//标基本信息
  findBorrowRule: 'app/borrowRule/findBorrowRule.mxd',//vip标协议
  getBorrowUserInfo: 'borrow/app/getBorrowUserInfo.mxd',//标借款人信息
  findBorrowInvestVoList: 'borrow/findBorrowInvestVoList.mxd',//优选标投资人记录
  getSetInvestList: 'appBorrowSet/getSetInvestList.mxd',//vip标投资人记录
  findBalanceCaption: 'app/withdraw/findBalanceCaption.mxd',//获取存管账户可用余额
  couponCanUsed: 'couponSwitch/couponCanUsed.mxd',//是否显示选券行
  findAllCanUseCouponTicket: 'couponTicket/findAllCanUseCouponTicket.mxd',//查找可用优惠券
  updateCouponTicketUsername: 'couponTicket/updateCouponTicketUsername.mxd',//兑换劵功能（劵和用户绑定）
  findInvestNoticeConf: 'borrowApp/findInvestNoticeConf.mxd',//投资按钮下方文本
  getInvestFormParams: 'invest/getInvestFormParams.mxd',//存管账户抢投（优选标）
  addSetInvest: 'appSetInvest/addSetInvest.mxd',//非存管抢投（VIP标）
  investRecordListCg : "investRecord/investRecordListCg.mxd", //投资管理散标列表
  incomeRecordListCg : "investRecord/incomeRecordListCg.mxd",//投资管理散标详情
  getUserInvestTrack : "userBorrowSet/getUserInvestTrack.mxd",//投资管理VIP列表
  getInvestedBorrowSetDetail : "userBorrowSet/getInvestedBorrowSetDetail.mxd",//投资管理VIP详情
  findAuth:'auth/findAuth.mxd',//查看认证信息
  findOnlyOneCardInfo : "bankCard/findOnlyOneCardInfo.mxd",//旧账户充值-获取绑卡信息
  findAccountold : "account/findAccount.mxd", //旧账户充值-获取余额
  applyRecharge : "recharge/applyRecharge.mxd",//旧账户充值
  sumRecharge : "recharge/sumRecharge.mxd", //旧账户充值记录-获取充值总额
  rechargeList : "recharge/rechargeList.mxd",//旧账户充值记录-获取充值列表
  findBankMsgByCardNo : "bankCard/checkBankCardNo.mxd", //旧账户银行卡号前六位查询开户行
  findBankNameListOfYeePay:'bankCard/findBankNameListOfYeePay.mxd',//旧账户银行列表
  findBankMsgByCard : "userAccount/findBankMsgByCardNo.mxd", //存管账户充值-根据银行卡获取限额说明
  findJindunBankList : "userAccount/findJindunBankList.mxd", //存管账户充值-银行限额表
  appToRechargeNew : "app/depositRecharge/appToRechargeNew.mxd",//存管账户充值
  rechargeListcg : "app/depositRecharge/rechargeList.mxd",//存管账户充值-获取充值记录
  bankcardold:'bankCard/addBankCardOnlyOneCard.mxd',//旧帐号绑定银行卡
  checkStatusAndCount:'authApp/findAuthStatusAndCount.mxd',//查询用户的 认证状态 和认证次数
  bankcardcg:'userBankCard/userBindingCard.mxd',//存管账户绑卡
  provingCaptcha:'user/provingCaptcha.mxd',//比较验证码否正确
  findAllCouponTicketNew:'couponTicket/findAllCouponTicketNew.mxd',//我的券
  queryRedEnvellope:'redenvelope/queryRedEnvellope.mxd',//现金红包
  findPhoneFriend:'phoneFriend/findPhoneFriend.mxd',//邀请好友-邀请好友明细
  findPhoneFriendContribute:'phoneFriend/findPhoneFriendContribute.mxd',//邀请好友-查询邀请好友贡献
  findInterfaceSwitchByType:'interfaceSwitch/findInterfaceSwitchByType.mxd',//邀请好友-详细规则
  getUserEncryptionUrl:'phoneFriend/getUserEncryptionUrl.mxd',//获取加密链接（手机端）
  updateTel:'personalInfo/updateTel.mxd',//修改用户手机号
  findPhoneRanking:"phoneFriend/findPhoneRanking.mxd",//2016邀请好友排名
  addRealnameAuth:'auth/app/addRealnameAuth.mxd',//实名认证接口
  findUserByEmailandPhone:'user/findUserByEmailandPhone.mxd',//获取用户验证过的手机号
  updatePassword:'user/updatePassword.mxd',//账户安全-手机号登录密码
  findAppConfLink:'borrowApp/findAppConfLink.mxd',//协议接口
  packageJinDunDate:'assignmentAutoSign/packageJinDunDate.mxd',//开通自动债转签约
}
