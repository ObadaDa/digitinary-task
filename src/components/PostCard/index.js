import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Comments from '../Comments';

import Api from '../../helpers/api';
import './styles.scss';

export default class PostCard extends Component {
  state = {
    id: 0,
    title: '',
    body: '',
    userName: '',
    editMode: false
  };

  componentDidMount() {
    const { userId, id, title, body } = this.props.post;

    this.api = new Api();
    this.api.getUserById(userId)
        .then((response) => this.setState({
          id: id,
          title: title,
          body: body,
          userName: response.data.name
        }))
        .catch((err) => console.log(err));
  }

  onEditClicked = () => {
    this.setState({ editMode: true });
  }

  onValueEdited = (e) => {
    this.setState({ body: e.target.value });
  }

  editPost = () => {
    const { id, body } = this.state;
    this.api.editPost(id, body)
        .then(() => this.setState({ editMode: false }))
        .catch((err) => console.log(err));
  }

  render() {
    const { userName, title, body, id, editMode } = this.state;
    const { onPostDeleted } = this.props;
    return (
      userName && <Grid item xs={8} className='post-card-container'>
          <Card>
            <CardContent>
              <Typography gutterBottom align='left' component='h3' className='card-header'>
              {!editMode && <div className='action-button'>
                  <Button size='small' color='primary' onClick={ this.onEditClicked }>
                    Edit
                  </Button>
                  <Button size='small' color='secondary' onClick={ () => { onPostDeleted(id) } }>
                    Delete
                  </Button>
                </div>}
                { title } <small className='auther-label'>by { userName }</small>
              </Typography>
              {!editMode && <Typography align='left' variant='body2' color='textSecondary' component='p'>
                { body }
              </Typography>}
              {editMode && ( <>
                <TextField className='edit-field' value={ body } multiline minRows={2} maxRows={4} onChange={this.onValueEdited}/>
                <Button className='edit-button' size='small' color='primary' onClick={ this.editPost }>
                    Edit
                </Button>
              </>)}
            </CardContent>
            <Comments id={id}></Comments>
          </Card>
      </Grid>
    );
  }
}
