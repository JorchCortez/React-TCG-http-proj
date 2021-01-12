import React from 'react'
import Axios from '../../../Axios'
import Post from '../../../components/Post/Post';   
import {Link, Route} from 'react-router-dom'
import FullPost from '../FullPost/FullPost'

class Posts extends React.Component{
    state = {
        posts: []
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
            console.log(err)
        })
    }

    PostSelectedHandler = (id) => {
        //this.setState({selectedPost:id})
        this.props.history.push({pathname: '/' + id})
    }

    render(){     
        let posts = <p style={{textAlign:"center"}}>Something went wrong</p>
        if(!this.state.error) {
            posts = this.state.posts.map( data => {
                return (
                    <Link to={'/posts/' + data.id} key={data.id}>
                        <Post  
                        title={data.title} 
                        author={data.author} 
                        clicked={() => this.PostSelectedHandler(data.id)} />
                    </Link>
                )
            })
        } 
        return(
            <div>
                <section className="Posts">
                    {posts}
                </section>  
                <Route path={this.props.match.url + "/:postId"} exact component={FullPost }/> 
            </div>
        )
    }
}

export default Posts;