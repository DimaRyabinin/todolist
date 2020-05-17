import React from 'react';



const Todo = ({todoItems, doneTask, deleteItem}) => {
    const items = todoItems.length ? (todoItems.map(item => {
        return (
            <div key={item.id} className={`collection-item ${item.status} ${item.view}`} onClick={() => doneTask(item.id, 'li' + item.id)}>
                <div className="wrapper">
                    <i id={'li' + item.id} className={`material-icons check`}>check</i>
                    <span id={item.id} className='collection-item__text'>{item.content}</span>
                </div>
                <i id={'clear' + item.id} className="material-icons clear" onClick={() => deleteItem(item.id)}>clear</i>
            </div>
        )
    })) : (
        <h2 className='center subtitle'>You don't have tasks</h2>
    )
    return(
        <div className='todos collection'>
            {items}
        </div>
    )
};

export default Todo;