import React, { Component } from 'react'
import axios from 'axios'
import Memo from './Memo'
import MemoForm from './MemoForm'
import update from 'immutability-helper'
import Notification from './Notification'

class MemosContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      memos: [],
      editingMemoId: null,
      notification: '',
      transitionIn: false
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/memos')
    .then(response => {
      this.setState({memos: response.data})
    })
    .catch(error => console.log(error))
  }

  addNewMemo = () => {
    axios.post('http://localhost:3001/memos', {memo: {title: 'New Memo', body: 'Memo Description'}})
    .then(response => {
      const memos = update(this.state.memos, { $splice: [[0, 0, response.data]]})
      memos.sort()
      this.setState({memos: memos, editingMemoId: response.data.id})
    })
    .catch(error => console.log(error))
  }

  updateMemo = (memo) => {
    const memoIndex = this.state.memos.findIndex(x => x.id === memo.id)
    const memos = update(this.state.memos, {[memoIndex]: { $set: memo }})
    this.setState({memos: memos, notification: 'All changes saved', transitionIn: true})
  }


  deleteMemo = (id) => {
    axios.delete(`http://localhost:3001/memos/${id}`)
    .then(response => {
      const memoIndex = this.state.memos.findIndex(x => x.id === id)
      const memos = update(this.state.memos, { $splice: [[memoIndex, 1]]})
      this.setState({memos: memos})
    })
    .catch(error => console.log(error))
  }

  resetNotification = () => {this.setState({notification: '', transitionIn: false})}

  enableEditing = (id) => {
    this.setState({editingMemoId: id}, () => { this.title.focus() })
  }

  render() {
    return (
      <div>
        <div>
          <button className="newMemoButton" onClick={this.addNewMemo} >
            New Memo
          </button>
          <Notification in={this.state.transitionIn} notification= {this.state.notification} />
        </div>
        {this.state.memos.map((memo) => {
          if(this.state.editingMemoId === memo.id) {
            return(<MemoForm memo={memo} key={memo.id} updateMemo={this.updateMemo}
                    titleRef= {input => this.title = input}
                    resetNotification={this.resetNotification} />)
          } else {
            return (<Memo memo={memo} key={memo.id} onClick={this.enableEditing}
                    onDelete={this.deleteMemo} />)
          }
        })}
      </div>
    );
  }
}

export default MemosContainer
