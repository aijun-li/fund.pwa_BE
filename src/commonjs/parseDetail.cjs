module.exports = function parseDetail(detail) {
  eval(detail)
  return {
    code: fS_code, // 基金代码
    name: fS_name, // 基金名称
    fund_source_rate: fund_sourceRate, // 原费率
    fund_rate: fund_Rate, // 现费率
    fund_min_apply: fund_minsg, // 最小申购金额
    stock_codes: stockCodes, // 基金持仓股票代码
    stock_codes_new: stockCodesNew, // 基金持仓股票代码(新市场号)
    zq_codes: zqCodes, // 基金持仓债券代码
    zq_codes_new: zqCodesNew, // 基金持仓债券代码(新市场号)
    yield: {
      one_year: syl_1n, // 近一年收益率
      six_month: syl_6y, // 近六月收益率
      three_month: syl_3y, // 近三月收益率
      one_month: syl_1y // 近一月收益率
    },
    fund_shares_positions: Data_fundSharesPositions, // 股票仓位测算图
    net_worth_trend: Data_netWorthTrend, // 单位净值走势 equityReturn-净值回报 unitMoney-每份派送金
    ac_worth_trend: Data_ACWorthTrend, // 累计净值走势
    grand_total: Data_grandTotal, // 累计收益率走势
    rate_in_similar_type: Data_rateInSimilarType, // 同类排名走势
    rate_in_similar_percent: Data_rateInSimilarPersent, // 同类排名百分比
    fluctuation_scale: Data_fluctuationScale, // 规模变动 mom-较上期环比
    holder_structure: Data_holderStructure, // 持有人结构
    asset_allocation: Data_assetAllocation, // 资产配置
    performance_evaluation: Data_performanceEvaluation, // 业绩评价 ['选股能力', '收益率', '抗风险', '稳定性','择时能力']
    current_manager: Data_currentFundManager, // 现任基金经理
    buy_redemption: Data_buySedemption, // 申购赎回
    same_type_rank: swithSameType // 同类型基金涨幅榜
  }
}
