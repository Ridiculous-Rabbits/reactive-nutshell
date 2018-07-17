import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"


const Animal = ({ animal, children }) => {
    return (
        <div className="card" style={{width: `18rem`}}>
            <div className="card-body">
                <h5 className="card-title">
                    {animal.name}
                </h5>
                <p className="card-text">{animal.breed}</p>
                {
                    <Link className="card-link"
                    to={{
                        pathname: `/animals/${animal.id}`,
                        state: { animal: animal }
                    }}>
                        Details
                    </Link>
                }
                <a href="#" onClick={() => this.props.checkOutAnimal(animal.id)}>Delete</a>
            </div>
        </div>
    )
}

Animal.propTypes = {
  // This rule ensures that `animal` is passed a property
  // and that is an object - not a string or number
  animal: PropTypes.object.isRequired,
  id: PropTypes.number,
  name: PropTypes.string
}

export default Animal