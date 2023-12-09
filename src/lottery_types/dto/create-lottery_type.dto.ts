export class CreateLotteryTypeDto {
  shop_id: string;
  competitive_football: object;
  competitive_basketball: object;
  victory_defeat: object;
  choice_nine: object;
  super_lotto: object;
  arrange_three: object;
  arrange_five: object;
  seven_color: object;
  four_matches: object;
  six_matches: object;
}

export const defaultSystem = {
  shop_id: '',
  competitive_football: {
    open_switch: true,
    draw_switch: false,
    buys_switch: false,
    complex_switch: false,
    bonus_switch: false,
    m_n_switch: false,
    deadline: 1,
    minMony: 1,
    type: 1,
    desc: '竞彩足球',
  },
  competitive_basketball: {
    open_switch: true,
    draw_switch: false,
    buys_switch: false,
    complex_switch: false,
    bonus_switch: false,
    m_n_switch: false,
    deadline: 1,
    minMony: 1,
    type: 2,
    desc: '竞彩篮球',
  },
  victory_defeat: {
    open_switch: true,
    draw_switch: false,
    buys_switch: false,
    complex_switch: false,
    bonus_switch: false,
    m_n_switch: false,
    deadline: 1,
    minMony: 1,
    type: 3,
    desc: '胜负彩',
  },
  choice_nine: {
    open_switch: true,
    draw_switch: false,
    buys_switch: false,
    complex_switch: false,
    bonus_switch: false,
    m_n_switch: false,
    deadline: 1,
    minMony: 1,
    type: 4,
    desc: '任选9',
  },
  super_lotto: {
    open_switch: true,
    draw_switch: false,
    buys_switch: false,
    complex_switch: false,
    bonus_switch: false,
    m_n_switch: false,
    deadline: 1,
    minMony: 1,
    type: 5,
    desc: '大乐透',
  },
  arrange_three: {
    open_switch: true,
    draw_switch: false,
    buys_switch: false,
    complex_switch: false,
    bonus_switch: false,
    m_n_switch: false,
    deadline: 1,
    minMony: 1,
    type: 6,
    desc: '排列三',
  },
  arrange_five: {
    open_switch: true,
    draw_switch: false,
    buys_switch: false,
    complex_switch: false,
    bonus_switch: false,
    m_n_switch: false,
    deadline: 1,
    minMony: 1,
    type: 7,
    desc: '排列五',
  },
  seven_color: {
    open_switch: true,
    draw_switch: false,
    buys_switch: false,
    complex_switch: false,
    bonus_switch: false,
    m_n_switch: false,
    deadline: 1,
    minMony: 1,
    type: 8,
    desc: '七星彩',
  },
  four_matches: {
    open_switch: true,
    draw_switch: false,
    buys_switch: false,
    complex_switch: false,
    bonus_switch: false,
    m_n_switch: false,
    deadline: 1,
    minMony: 1,
    type: 9,
    desc: '4场进球彩',
  },
  six_matches: {
    open_switch: true,
    draw_switch: false,
    buys_switch: false,
    complex_switch: false,
    bonus_switch: false,
    m_n_switch: false,
    deadline: 1,
    minMony: 1,
    type: 10,
    desc: '6场半全场',
  },
};