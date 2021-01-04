import React, { Component } from 'react';
import Axios from 'axios'

import './FullPost.css'; 

class FullPost extends Component {

    state ={
        loadedPost: null
    }
    componentDidUpdate(){
        if(this.props.postId) {
            if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.postId)){ 
                console.log(this.props.postId)
                Axios.get(`/posts/${this.props.postId}`)
                .then(Response => { 
                    console.log(Response) 
                    this.setState({
                        loadedPost: Response.data
                    })
                })      
            }      
        }
    } 

    DeletePostHandler = () => {
        Axios.delete(`/posts/${this.props.postId}`)
        .then(res => {
            console.log(res)
        })
    }
    render () {

        let post = <p style={{textAlign:"center"}}>Please select a Post!</p>

        if(this.props.postId){
           post = <p style={{textAlign:"center"}}>Loading...</p>
        }
        
        if(this.state.loadedPost){
            console.log(this.state.loadedPost, "color:blue")
            post = (<div className="FullPost">
                        <h1>{this.state.loadedPost.title}</h1>
                        <p>{this.state.loadedPost.body}</p>
                        <div className="Edit">
                            <button className="Delete" onClick={this.DeletePostHandler}>Delete</button>
                        </div>
                    </div> )
        } 
                                        
        
        return post;
    }
}

export default FullPost;