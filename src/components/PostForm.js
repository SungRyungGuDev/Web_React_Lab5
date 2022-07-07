import React, { Component } from 'react'
import axios from 'axios'

class PostForm extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         id: '',
         title: ''
      }
    }
    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }
    submitHandler = (event) => {
        event.preventDefault();
        console.log(this.state);
        axios.post('https://jsonplaceholder.typicode.com/photos', this.state)
        .then(response => {
            console.log(response);})
        .catch(err => {
            console.log(err);})
    }
  render() {
    const { id, title } = this.state;
    return (
      <div className="container">
        <p className="p">Post Form</p>
        <form onSubmit={this.submitHandler}>
            <div>
                <label style={{ marginRight: '30px', marginBottom: '30px' }}>ID</label>
                <input type="text" name="id" value={id} onChange={this.changeHandler} />
            </div>
            <div>
                <label style={{ marginRight: '15px',  marginBottom: '30px'  }}>Title</label>
                <input type="text" name="title" value={title} onChange={this.changeHandler} />
            </div>
            <div>
                <button style={{ color: 'Red', fontSize: '20px'}} type="submit">Submit</button>
            </div>
        </form>
      </div>
    )
  }
}

export default PostForm