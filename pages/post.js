class Post extends React.Component {
  static async getInitialProps({ query: { id } }) {
    return { postId: id }
  }
  render() {
    return (
      <div>
        <h1>My blog post #{this.props.postId}</h1>
      </div>
    )
  }
}

export default Post