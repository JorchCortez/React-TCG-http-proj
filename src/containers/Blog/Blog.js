import React, { Component } from 'react';
import Posts from '../../containers/Blog/Posts/Posts'
import './Blog.css';
//import NewPost from './NewPost/NewPost'
import asyncComponent from '../../HOC/AsyncComponent' 
import {Route, NavLink, Switch, Redirect} from 'react-router-dom' 


const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});


class Blog extends Component {

    state = {
        auth : true
    }

    render () {  
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                        <li><NavLink to="/posts" exact>Home</NavLink></li>
                        <li><NavLink to="/NewPost" exact>New Post</NavLink></li>  
                        </ul>
                    </nav>
                </header>
                <Switch>
                   {this.state.auth ? <Route path="/NewPost" component={AsyncNewPost}/> : null } 
                    <Route path="/posts" component={Posts}/>
                    {/*<Redirect from="/" to="/posts" />*/}
                    <Route render={() => <h1>Not found</h1>} />
                </Switch>
            </div>
        );
    }
}

export default Blog;