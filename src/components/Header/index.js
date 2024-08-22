import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoCloseOutline} from 'react-icons/io5'
import MoodTrackerContext from '../../context/MoodTrackerContext'
import './index.css'

class Header extends Component {
  state = {
    mobileMenu: false,
  }

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  onClickHomeTab = () => {
    this.setState({
      mobileMenu: false,
    })
  }

  onClickReportTab = () => {
    this.setState({
      mobileMenu: false,
    })
  }

  onToogleMovieView = () => {
    const {mobileMenu} = this.state
    this.setState({mobileMenu: !mobileMenu})
  }

  render() {
    const {mobileMenu} = this.state

    return (
      <MoodTrackerContext.Consumer>
        {value => {
          const {
            homeActive,
            reportActive,
            onClickReportTabCon,
            onClickHomeTabCon,
          } = value

          const homeTabClass = homeActive ? 'header-active' : ''
          const reportTabClass = reportActive ? 'header-active' : ''

          const onClickUpdateReportTab = () => {
            onClickReportTabCon()
          }
          const onClickUpdateHomeTab = () => {
            onClickHomeTabCon()
          }

          return (
            <>
              <nav className="header-bar">
                <ul className="header-ul">
                  <li className="header-head">
                    <h1>Daily Mood Tracker</h1>
                  </li>
                  <div className="header-con">
                    <Link
                      onClick={(this.onClickHomeTab, onClickUpdateHomeTab)}
                      className={`header-link ${homeTabClass}`}
                      to="/"
                    >
                      <li>Home</li>
                    </Link>
                    <Link
                      onClick={(this.onClickReportTab, onClickUpdateReportTab)}
                      to="/reports"
                      className={`header-link ${reportTabClass}`}
                    >
                      <li>Reports</li>
                    </Link>
                    <li>
                      <button
                        onClick={this.onClickLogout}
                        className="header-btn"
                        type="button"
                      >
                        Logout
                      </button>
                    </li>
                  </div>

                  <div className="header-mobile-view">
                    <button
                      className="header-mobileView-btn"
                      onClick={this.onToogleMovieView}
                      type="button"
                    >
                      {mobileMenu ? (
                        <IoCloseOutline className="header-icon" />
                      ) : (
                        <GiHamburgerMenu className="header-icon" />
                      )}
                    </button>
                  </div>
                </ul>
              </nav>

              {mobileMenu ? (
                <div className="header-con-mob">
                  <Link to="/" className={`header-link ${homeTabClass}`}>
                    <li onClick={(this.onClickHomeTab, onClickUpdateHomeTab)}>
                      Home
                    </li>
                  </Link>
                  <Link
                    to="/reports"
                    className={`header-link ${reportTabClass}`}
                  >
                    <li
                      onClick={(this.onClickReportTab, onClickUpdateReportTab)}
                    >
                      Reports
                    </li>
                  </Link>
                  <li>
                    <button
                      onClick={this.onClickLogout}
                      className="header-btn"
                      type="button"
                    >
                      Logout
                    </button>
                  </li>
                </div>
              ) : (
                ''
              )}
            </>
          )
        }}
      </MoodTrackerContext.Consumer>
    )
  }
}

export default withRouter(Header)
