import React from 'react';



const Button = ({content, className, onFunction, todoItems}) => {
    const button = todoItems.length ? (<button className={className} onClick={onFunction}>{content}</button>
        ) : (null)
    return (
        button
    )
}

export default Button;