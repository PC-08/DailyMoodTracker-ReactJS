import {Component} from 'react'
import Header from '../Header'
import Calender from '../Calender'
import MoodTrackerContext from '../../context/MoodTrackerContext'

import './index.css'

const emojisList = [
  {
    id: '380e6284-a454-11ec-b909-0242ac120002',
    emojiName: 'Very Happy',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/monthly-emojis/monthly-emojis-very-happy.png',
  },
  {
    id: '380e64f0-a454-11ec-b909-0242ac120002',
    emojiName: 'Happy',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/monthly-emojis/monthly-emojis-happy.png',
  },
  {
    id: '380e6626-a454-11ec-b909-0242ac120002',
    emojiName: 'Neutral',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/monthly-emojis/monthly-emojis-neutral.png',
  },
  {
    id: '380e6748-a454-11ec-b909-0242ac120002',
    emojiName: 'Sad',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/monthly-emojis/monthly-emojis-sad.png',
  },
  {
    id: '380e69c8-a454-11ec-b909-0242ac120002',
    emojiName: 'Very Sad',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/monthly-emojis/monthly-emojis-very-sad.png',
  },
]

const daysList = [
  {
    id: '3639dd44-a5d5-11ec-b909-0242ac120002',
    day: 'Sun',
    dayNumber: 1,
  },
  {
    id: '3639e17c-a5d5-11ec-b909-0242ac120002',
    day: 'Mon',
    dayNumber: 2,
  },
  {
    id: '3639e37a-a5d5-11ec-b909-0242ac120002',
    day: 'Tue',
    dayNumber: 3,
  },
  {
    id: '3639e532-a5d5-11ec-b909-0242ac120002',
    day: 'Wed',
    dayNumber: 4,
  },
  {
    id: '3639e8c0-a5d5-11ec-b909-0242ac120002',
    day: 'Thu',
    dayNumber: 5,
  },
  {
    id: '3639ea32-a5d5-11ec-b909-0242ac120002',
    day: 'Fri',
    dayNumber: 6,
  },
  {
    id: '3639eb90-a5d5-11ec-b909-0242ac120002',
    day: 'Sat',
    dayNumber: 0,
  },
]

const GetEmoji = props => {
  const {eachEmoji, isEmojiActive, onSelectEmoji} = props

  const {id, emojiName, emojiUrl} = eachEmoji

  const activeEmojiClassImg = isEmojiActive ? 'active-emoji-img' : ''

  const onClickEmoji = () => {
    onSelectEmoji(id)
  }

  return (
    <li className="emoji-li">
      <button className="emji-btn" type="button" onClick={onClickEmoji}>
        <p className="emoji-para-li">{emojiName}</p>
        <img
          className={`emoji-img ${activeEmojiClassImg}`}
          src={emojiUrl}
          alt={emojiName}
        />
      </button>
    </li>
  )
}

const GetEmojiSelect = props => {
  const {eachEmoji} = props

  const {emojiName} = eachEmoji

  return (
    <option className="op" value={emojiName}>
      {emojiName}
    </option>
  )
}

const GetDayselect = props => {
  const {eachDay} = props
  const {day, dayNumber} = eachDay

  return (
    <option className="op" value={dayNumber}>
      {day}
    </option>
  )
}

class Home extends Component {
  render() {
    return (
      <MoodTrackerContext.Consumer>
        {value => {
          const {
            monthList,
            updateContextMonthListMethod,
            selectEmojiCount,
            onSelectDayChange,
            onSelectEmojiChange,
            onSelectEmoji,
            activeEmoji,
          } = value

          const onEmojiAddonDateReq = props => {
            updateContextMonthListMethod({...props, activeEmoji})
          }

          return (
            <>
              <div className="home-bg">
                <Header />
                <div className="home-main-container">
                  <h1 className="home-head">Moods in a Month</h1>
                  <div className="home-content-contaier">
                    <Calender
                      monthList={monthList}
                      onEmojiAddonDateReq={onEmojiAddonDateReq}
                    />
                    <div>
                      <ul className="emojis-container">
                        {emojisList.map(eachEmoji => (
                          <GetEmoji
                            key={eachEmoji.id}
                            eachEmoji={eachEmoji}
                            isEmojiActive={eachEmoji.id === activeEmoji.id}
                            onSelectEmoji={onSelectEmoji}
                          />
                        ))}
                      </ul>
                      <div className="select-container">
                        <select
                          className="select"
                          onChange={onSelectEmojiChange}
                        >
                          {emojisList.map(eachEmoji => (
                            <GetEmojiSelect
                              key={eachEmoji.id}
                              eachEmoji={eachEmoji}
                            />
                          ))}
                        </select>
                        <select className="select" onChange={onSelectDayChange}>
                          {daysList.map(eachDay => (
                            <GetDayselect key={eachDay.id} eachDay={eachDay} />
                          ))}
                        </select>
                        <div>
                          <h1>{selectEmojiCount}</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }}
      </MoodTrackerContext.Consumer>
    )
  }
}

export default Home
