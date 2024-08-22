import {Component} from 'react'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

import Header from '../Header'
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

const GetReportEmojiCards = props => {
  const {monthList, eachEmoji} = props
  const {emojiName, emojiUrl} = eachEmoji

  let count = 0

  monthList.map(eachMonth =>
    eachMonth.dates.map(eachDate => {
      if (eachDate.emojiName === emojiName) {
        count += 1
      }
      return eachMonth
    }),
  )

  return (
    <li>
      <div className="report-emoji-card">
        <p className="report-emoji-card-head">{emojiName}</p>
        <img className="report-emoji-card-img" src={emojiUrl} alt={emojiName} />
        <p className="report-emoji-card-count">{count}</p>
      </div>
    </li>
  )
}

const GetReportMonthoptions = props => {
  const {eachMonth} = props
  return <option value={eachMonth.month}>{eachMonth.monthName}</option>
}

const GetReportChart = props => {
  console.log(props)
  const {monthList} = props
  const monthListDates = monthList.dates

  let veryHappyCount = 0
  let happyCount = 0
  let neutralCount = 0
  let sadCount = 0
  let verySadCount = 0

  monthListDates.map(eachDate => {
    if (eachDate.emojiName === 'Very Happy') {
      veryHappyCount += 1
    } else if (eachDate.emojiName === 'Happy') {
      happyCount += 1
    } else if (eachDate.emojiName === 'Neutral') {
      neutralCount += 1
    } else if (eachDate.emojiName === 'Sad') {
      sadCount += 1
    } else if (eachDate.emojiName === 'Very Sad') {
      verySadCount += 1
    }

    return eachDate
  })

  const data = [
    {count: veryHappyCount, name: 'Very Happy'},
    {count: happyCount, name: 'Happy'},
    {count: neutralCount, name: 'Neutral'},
    {count: sadCount, name: 'Sad'},
    {count: verySadCount, name: 'Very Sad'},
  ]

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis hide="true" />

        <YAxis
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
          }}
        />

        <Bar
          dataKey="count"
          name="name"
          fill="#FFBE38"
          barSize={40}
          borderRadius={3}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

const GetChartEmoji = props => {
  const {eachEmoji} = props

  return (
    <li>
      <img
        className="chart-emoji"
        alt={eachEmoji.emojiName}
        src={eachEmoji.emojiUrl}
      />
    </li>
  )
}

class Reports extends Component {
  state = {selectedMontnReport: 1}

  onSelectMonthChange = event => {
    this.setState({selectedMontnReport: event.target.value})
    console.log(event.target.value)
  }

  render() {
    const {selectedMontnReport} = this.state
    return (
      <MoodTrackerContext.Consumer>
        {value => {
          const {monthList} = value
          return (
            <>
              <div className="Report-bg-Container">
                <Header />
                <div>
                  <p className="report-head">Overall Emoji Report</p>
                  <ul className="report-emoji-card-container">
                    {emojisList.map(eachEmoji => (
                      <GetReportEmojiCards
                        key={eachEmoji.id}
                        eachEmoji={eachEmoji}
                        monthList={monthList}
                      />
                    ))}
                  </ul>
                  <div className="report-select-con">
                    <h1 className="report-head">Monthly Reports</h1>
                    <select
                      onChange={this.onSelectMonthChange}
                      className="report-select"
                    >
                      {monthList.map(eachMonth => (
                        <GetReportMonthoptions
                          key={eachMonth.month}
                          eachMonth={eachMonth}
                        />
                      ))}
                    </select>
                  </div>

                  <div className="report-chart-container">
                    <GetReportChart
                      monthList={monthList[selectedMontnReport - 1]}
                    />
                    <ul className="chart-emoji-con">
                      {emojisList.map(eachEmoji => (
                        <GetChartEmoji
                          key={eachEmoji.id}
                          eachEmoji={eachEmoji}
                        />
                      ))}
                    </ul>
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

export default Reports
