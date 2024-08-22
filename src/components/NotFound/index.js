import Header from '../Header'
import './index.css'

const NotFound = () => (
  <div className="NotFound-bg">
    <Header />

    <div className="NotFound-Con">
      <img
        alt="Not Found"
        src="https://res.cloudinary.com/ddtfzb2ki/image/upload/v1721659668/ljxtapmpcbfnstrporm5.png"
      />
      <h1>Page Not Found.</h1>
      <p>We are sorry, the page you requested could not be found.</p>
    </div>
  </div>
)

export default NotFound
