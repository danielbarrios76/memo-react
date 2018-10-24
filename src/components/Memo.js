import React from 'react';
const Memo = ({memo}) =>
    <div className="tile" key={memo.id}>
        <h4>{memo.title}</h4>
        <p>{memo.body}</p>
    </div>
export default Memo;