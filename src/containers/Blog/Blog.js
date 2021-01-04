import React, { Component } from 'react';
import Axios from '../../Axios'
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        posts: [],
        selectedPost: null,
        error: false
    }

    componentDidMount() {
        Axios.get('/posts')
        .then(Response => {
            const posts = Response.data.slice(0,4)
            const updatedPosts = posts.map(post => {return{
                ...post, 
                author: "Joorch"
            }})
            this.setState({posts: updatedPosts})
        })
        .catch(err =>{
            this.setState({error: true})
        })
    }

    PostSelectedHandler = (id) => {
        this.setState({selectedPost:id})
    }

    render () { 
        let posts = <p style={{textAlign:"center"}}>Something went wrong</p>
        if(!this.state.error) {
            posts = this.state.posts.map( data => {
                return <Post 
                key={data.id} 
                title={data.title} 
                author={data.author} 
                clicked={() => this.PostSelectedHandler(data.id)} />
            })
        } 

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost postId={this.state.selectedPost} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;