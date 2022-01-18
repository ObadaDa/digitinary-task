import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Api from '../../helpers/api';
import CommentCard from '../CommentCard';

import './styles.scss';

export default class Comments extends Component {
  state = {
    comments: [],
  };

  componentDidMount() {
    const { id } = this.props;
    this.api = new Api();
    this.api.getComments(id)
        .then((response) => this.setState({ comments: response.data }))
        .catch((err) => console.log(err));
  }

  render() {
    return (
        <div className='comments-container'>
            <Grid container spacing={1}>
                {this.state.comments.map((comment, index) => <CommentCard key={index} comment={comment}/> )}
            </Grid>
        </div>
    );
  }
}