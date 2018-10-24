import React, { Component } from 'react';
import axios from 'axios';
import Memo from './Memo';

class MemosContainer extends Component {
    constructor(props) {
        super(props)
        this.state = { memos: [] }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/memos')
        .then(response => {
            console.log(response)
            this.setState({
                memos: response.data
            })
        })
        .catch(error => console.log(error))
    }

    render() {
        return (
          <div>
            {this.state.memos.map((memo) => {
              return( <Memo memo = {memo} key = {memo.id}/>)      
            })}
          </div>
        );
      }
}

export default MemosContainer;