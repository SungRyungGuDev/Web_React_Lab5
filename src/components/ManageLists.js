import React, { Component } from 'react'
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'


class ManageLists extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         posts: [],
         error: ''
      }
    }
    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/photos')
        .then(response => {
            console.log(response);
            this.setState({ posts: response.data });
        })
        .catch(error => {
            console.log(error);
            this.setState({ errorMsg: 'Error retrieving data' });

        })
    }
    deleteRow = (id, e) => {       
        axios.delete(`https://jsonplaceholder.typicode.com/photos/${id}`)
        .then(response => {
        console.log(response.data);
        const posts = this.state.posts.filter(post => post.id !== id);
        this.setState({ posts });
    })
}
  render() {
    const { posts, errorMsg } = this.state;
    return (
      <div className='body'>
        <h1 style={{ fontSize: '50px', marginTop: '30px', marginBottom: '30px' }}>List of Photos from API server</h1>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#ID</th>
                    <th>Title</th>
                    <th>Thumbnail</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {
                posts.map(post => 
                    <tr key={post.id}>
                        <React.Fragment>
                            <td style={{ paddingTop: "75px"}}>{post.id}</td>
                            <td style={{ paddingTop: "75px"}}>{post.title}</td>
                            <td><img alt='thumbnailUrl' src={post.thumbnailUrl}/></td>
                            <td style={{ paddingTop: "75px"}}><button onClick={(e) => this.deleteRow(post.id,e)}>Delete</button></td>
                        </React.Fragment>
                    </tr>
                )
            }
            </tbody>
        </Table>
            {
            errorMsg ? <div>{errorMsg}</div>:null
            }
      </div>
    )
  }
}


export default ManageLists