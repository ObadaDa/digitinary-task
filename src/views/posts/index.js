import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Navigate } from 'react-router-dom';
import NewPostCard from '../../components/NewPostCard';
import PostCard from '../../components/PostCard'

import Api from '../../helpers/api';
import UserSession from '../../helpers/userSession';

import './styles.scss';

export default class Posts extends Component {
  state = {
    posts: []
  };

  constructor() {
    super();

    this.onPostDeleted = this.onPostDeleted.bind(this);
  }

  componentDidMount() {
    this.api = new Api();
    this.api.getPosts()
        .then((response) => this.setState({ posts: response.data }))
        .catch((err) => console.log(err));
  }

  onPostDeleted(id) {
    this.api.deletePost(id)
        .then(() => {
          /**
           * weird behavior, current code removes the deleted item from the list
           * but in UI it removes the last item, by that, state.posts content and UI content does not match
           * if we clear posts array first it works fine
           * TODO: try to understnd what the hick is going on here
           */
          const updatedPosts = this.state.posts.filter(post => post.id !== id);
          this.setState({ posts: [] })
          this.setState({ posts: updatedPosts })
        })
        .catch((err) => console.log(err));
  }

  onPostSubmited = (data) => {
    this.api.addPost(data)
      .then((response) => {
        const updatedPosts = [response.data, ...this.state.posts];
        this.setState({ posts: [] })
        this.setState({ posts: updatedPosts})
      })
      .catch((err) => console.log(err));
  }

  render() {
    if(!UserSession.getUser()) {
      return <Navigate to='/login'></Navigate>
    }

    return (
      <div className='posts-container'>
          <AppBar>
              <Toolbar>
                  <Typography>Posts</Typography>
              </Toolbar>
          </AppBar>
          <Grid container spacing={2} className='grid'>
            <NewPostCard onPostSubmited={this.onPostSubmited}/>
            {this.state.posts.map((post, index) => <PostCard key={index} post={post} onPostDeleted={this.onPostDeleted}/> )}
          </Grid>
      </div>
    );
  }
}