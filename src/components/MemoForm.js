import React, { Component } from 'react'
import axios from 'axios'

class MemoForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
      title: this.props.memo.title,
      body: this.props.memo.body
		}
	}

  handleInput = (e) => {
    this.props.resetNotification()
    this.setState({[e.target.name]: e.target.value})
  }

  handleBlur = () => {
    const memo = {title: this.state.title, body: this.state.body }
    axios.put(
      `http://localhost:3001/memos/${this.props.memo.id}`,
      {memo: memo}
      )
    .then(response => {
      console.log(response)
      this.props.updateMemo(response.data)
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="tile">
      	<form onBlur={this.handleBlur} >
					<input className='input' type="text" name="title" placeholder='Title for Memo'
            value={this.state.title} onChange={this.handleInput}
            ref={this.props.titleRef} />
					<textarea className='input' name="body" placeholder='Memo description'
            value={this.state.body} onChange={this.handleInput}></textarea>
      	</form>
      </div>
    );
  }
}

export default MemoForm
