import React from 'react'

const MoodTrackerContext = React.createContext({
  activeMonth: '',
  activeEmoji: '',
  homeActive: '',
  reportActive: '',
  selectEmojiCount: 0,
  selectedEmoji: '',
  selectedDay: '',
  monthList: [],
  updateMonthMethod: () => {},
  updateContextMonthListMethod: () => {},
  onEmojiAddonDateReqMethod: () => {},
  onSelectEmojiChange: () => {},
  onSelectDayChange: () => {},
  onClickReportTabCon: () => {},
  onClickHomeTabCon: () => {},
  onSelectEmoji: () => {},
})

export default MoodTrackerContext
