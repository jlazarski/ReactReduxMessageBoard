import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostCard from '../Components/PostCard';
import Link from 'react-router-dom/es/Link';
import { deletePost } from '../Actions/PostActions';

class PostDetail extends Component {
  render() {
    const { post, history, match, deletePost, user } = this.props;
    if(post === undefined) {
      history.push('/')
    }
    return (
      <div>
        <div className="navbar">
          <Link className="btn btn-primary" to={'/'}>Go home</Link>
        </div>
        <div className="container">
          <PostCard>
            <h1>{post.title}</h1>
            <p className="card-text">
              {post.body}
            </p>
            {post.uid === user.uid &&
            <button className="btn btn-danger float-right"
                    onClick={() => {
                      deletePost(match.params.id);
                      history.push('/');
                    }}>Delete</button>}
          </PostCard>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { post: state.posts[ownProps.match.params.id], user: state.user, posts: state.posts };
}

export default connect(mapStateToProps, { deletePost })(PostDetail);