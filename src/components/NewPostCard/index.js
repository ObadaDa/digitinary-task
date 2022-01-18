import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import UserSession from '../../helpers/userSession';

import './styles.scss';

export default class NewPostCard extends Component {
  state = {
    userId: 0,
    title: '',
    body: ''
  };

  componentDidMount() {
    this.user = UserSession.getUser()
    this.setState({ userId: this.user.id });
  }

  onTitleChanged = (e) => {
    this.setState({ title: e.target.value });
  }

  onBodyChanged = (e) => {
    this.setState({ body: e.target.value });
  }

  submitPost = () => {
    const { onPostSubmited } = this.props
    onPostSubmited(this.state);
    this.setState({ 
      title: '',
      body: '',
    });
  }

  render() {
    const { title, body } = this.state;

    return (
      <Grid item xs={8} className='new-posts-container'>
          <Card>
              <CardContent>
              <Typography gutterBottom align='left' component='h3' className="card-header">
                  New Post
              </Typography>
              <TextField className="post-field" placeholder="Title" value={ title } minRows={1} onChange={this.onTitleChanged}/>
              <TextField className="post-field" placeholder="What's on your mind?" value={ body } multiline minRows={2} maxRows={4} onChange={this.onBodyChanged}/>
              <Button className="post-button" size='large' color='primary' onClick={ this.submitPost }>
                  Post 
              </Button>
              </CardContent>
          </Card>
      </Grid>
    );
  }
}