import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"


const News = (props) => {
    console.log(props)
    return (
        <div className="card" style={{width: `18rem`}}>
            { <div className="card-body">
                <h5 className="card-title">
                    {props.news.title}
                </h5>
                <p className="card-text">{props.news.synopsis}</p>
                <p className="card-text">{props.news.url}</p>
                {
                    <Link className="card-link"
                    to={{
                        pathname: `/news/${props.news.id}`,
                        state: { news: props.news }
                    }}>
                        Details
                    </Link>
                }
                <a href="#" onClick={() => this.props.checkOutNews(props.news.id)}>Delete</a>
            </div> }
        </div>
    )
}

// News.propTypes = {
//   // This rule ensures that `news` is passed a property
//   // and that is an object - not a string or number
//   news: PropTypes.object.isRequired,
//   id: PropTypes.number,
//   name: PropTypes.string
// }

export default News