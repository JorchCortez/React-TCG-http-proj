import React, { Component } from 'react';
import Axios from 'axios'

import './FullPost.css'; 

class FullPost extends Component {

    state ={
        loadedPost: null
    }
    componentWillMount(){
        this.LoadData()
    }

    componentDidUpdate(){
        this.LoadData()
    }


    LoadData(){
        if(this.props.match.params.postId) {
            if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.postId)){ 
                //console.log(this.state.loadedPost.id, this.props.match.params.postId)

                console.log("searching")
                Axios.get(`/posts/${this.props.match.params.postId}`)
                .then(Response => { 
                    console.log(Response) 
                    this.setState({
                        loadedPost: Response.data
                    })
                })
                .catch(err => {
                    console.log(err)
                })      
            }      
        }
    } 

    DeletePostHandler = () => {
        Axios.delete(`/posts/${this.props.match.params.postId}`)
        .then(res => {
            console.log(res)
        })
    }
    render () {

        let post = <p style={{textAlign:"center"}}>Please select a Post!</p>

        if(this.props.match.params.postId){
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