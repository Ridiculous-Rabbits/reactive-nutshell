import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"


const News = ({ news, children }) => {
    return (
        <div className="card" style={{width: `18rem`}}>
            <div className="card-body">
                <h5 className="card-title">
                    {news.name}
                </h5>
                <p className="card-text">{news.breed}</p>
                {
                    <Link className="card-link"
                    to={{
                        pathname: `/newss/${news.id}`,
                        state: { news: news }
                    }}>
                        Details
                    </Link>
                }
                <a href="#" onClick={() => this.props.checkOutNews(news.id)}>Delete</a>
            </div>
        </div>
    )
}

News.propTypes = {
  // This rule ensures that `news` is passed a property
  // and that is an object - not a string or number
  news: PropTypes.object.isRequired,
  id: PropTypes.number,
  name: PropTypes.string
}

export default News