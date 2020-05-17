import React from 'react';



const Search = ({type, length, searchItems, todoItems}) => {
    const items = todoItems.length ? (
        <div id='search' className='wrapper'>
          <span className='tasks-text'>{type} tasks: </span><span className='tasks-number'>{length}</span>
          <input type='text' placeholder='search items' className='input-search' onKeyUp={searchItems}></input>
        </div>
    ) : (null)
    return (
        items
    )
}

export default Search;