import {Component} from 'react'

import {FaChevronRight} from 'react-icons/fa6'
import {FaChevronLeft} from 'react-icons/fa'
import MoodTrackerContext from '../../context/MoodTrackerContext'

import './index.css'

const GetDate = props => {
  const {eachDate, onEmojiAddonDateReq, month} = props
  const {id, date, emojiUrl} = eachDate

  const onDateClick = () => {
    onEmojiAddonDateReq({month, dateId: id, date})
  }

  return (
    <li className="emoji-date-card">
      <button onClick={onDateClick} className="date-bg" type="button">
        <p>{date}</p>
        {emojiUrl === '' ? null : (
          <img className="date-card-img" alt={date} src={emojiUrl} />
        )}
      </button>
    </li>
  )
}

const GetMonth = props => {
  const {eachMonth, onEmojiAddonDateReq} = props
  const {month, dates} = eachMonth

  return (
    <div>
      <ul className="dates-con">
        {dates.map(eahDate => (
          <GetDate
            key={eahDate.id}
            onEmojiAddonDateReq={onEmojiAddonDateReq}
            eachDate={eahDate}
            month={month}
          />
        ))}
      </ul>
    </div>
  )
}

class Calender extends Component {
  state = {
    activeReviewIndex: 0,
    mLength: 12,
  }

  onClickLeftArrow = () => {
    const {activeReviewIndex} = this.state

    if (activeReviewIndex > 0) {
      this.setState(prevState => ({
        activeReviewIndex: prevState.activeReviewIndex - 1,
      }))
    }
  }

  onClickRightArrow = () => {
    const {activeReviewIndex, mLength} = this.state

    if (activeReviewIndex < mLength - 1) {
      this.setState(prevState => ({
        activeReviewIndex: prevState.activeReviewIndex + 1,
      }))
    }
  }

  render() {
    const {monthList, onEmojiAddonDateReq} = this.props

    return (
      <MoodTrackerContext.Consumer>
        {value => {
          const {updateMonthMethod, activeMonth} = value

          const onClickBack = () => {
            updateMonthMethod(activeMonth - 1)
          }

          const onClickNext = () => {
            updateMonthMethod(activeMonth + 1)
          }

          const activeMonthc = monthList[activeMonth - 1]

          return (
            <div className="slider-container">
              <div>
                <div className="but-con">
                  <button
                    className="arrow"
                    onClick={(this.onClickLeftArrow, onClickBack)}
                    type="button"
                    data-testid="previous-button"
                    aria-label="Previous"
                  >
                    <FaChevronLeft />
                  </button>
                  <h1>{activeMonthc.monthName}</h1>

                  <button
                    className="arrow"
                    onClick={(this.onClickRightArrow, onClickNext)}
                    type="button"
                    data-testid="next-button"
                    aria-label="Next"
                  >
                    <FaChevronRight />
                  </button>
                </div>
                <ul className="c-ul">
                  <li className="c-li">
                    <p>Sun</p>
                  </li>
                  <li className="c-li">
                    <p>Mon</p>
                  </li>
                  <li className="c-li">
                    <p>Tue</p>
                  </li>
                  <li className="c-li">
                    <p>Wed</p>
                  </li>
                  <li className="c-li">
                    <p>Thu</p>
                  </li>
                  <li className="c-li">
                    <p>Fri</p>
                  </li>
                  <li>
                    <p className="c-li">Sat</p>
                  </li>
                </ul>
                <GetMonth
                  eachMonth={activeMonthc}
                  onEmojiAddonDateReq={onEmojiAddonDateReq}
                />
              </div>
            </div>
          )
        }}
      </MoodTrackerContext.Consumer>
    )
  }
}

export default Calender
