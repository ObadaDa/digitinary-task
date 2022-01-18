import * as axios from 'axios';

export default class Api {
  api_url;
  constructor() {
    this.api_url = process.env.REACT_APP_API_ENDPOINT;
  }

  init() {
    return axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      headers: {
        Accept: 'application/json',
      },
    });
  };

  //Users
  getUsersList = () => {
    return this.init().get('/users');
  };

  getUserById = (id) => {
    return this.init().get(`/users/${id}`);
  };

  getUserByEmail = (email) => {
    return this.init().get(`/users?email=${email}`);
  };

  //Posts
  getPosts = () => {
    return this.init().get('/posts');
  };

  addPost = (data) => {
    return this.init().post('/posts', data);
  };

  editPost = (id, data) => {
    return this.init().put(`/posts/${id}`, data);
  };

  deletePost = (id) => {
    return this.init().delete(`/posts/${id}`);
  };

  //Comments
  getComments = (id) => {
    return this.init().get(`/comments?postId=${id}`);
  };
}