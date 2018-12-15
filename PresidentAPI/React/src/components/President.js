import React from "react";
import PropTypes from "prop-types";

function President(props) {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.birthdate}</td> 
            <td>{props.birthplace}</td>
            <td>{props.deathdate}</td> 
            <td>{props.deathplace}</td>
        </tr>
      );
}

President.propTypes = {
    name: PropTypes.string.isRequired
  };

export default President;