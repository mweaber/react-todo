import React from "react";

// Use the ...props to spread all the passed props
// onto this element. That way you wont have to 
// define them all individually.

function DeleteBtn(props) {
    return (
        <span className="delete-btn" {...props} role="button" tabIndex="0">
           ✗ 
        </span>
    );
}

export default DeleteBtn;