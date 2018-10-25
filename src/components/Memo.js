import React, { Component } from 'react'

class Memo extends Component {
	handleClick = () => { this.props.onClick(this.props.memo.id) }

	handleDelete = () => { this.props.onDelete(this.props.memo.id) }

	render () {
		return(
		  <div className="pad">
		  	<span className="deleteButton" onClick={this.handleDelete}>x</span>
		    <h4 onClick={this.handleClick}>{this.props.memo.title}</h4>
		    <p onClick={this.handleClick}>{this.props.memo.body}</p>
		  </div>
		)
	}
}

export default Memo
