import Layout from '../components/MyLayout'
import Axios from 'axios'
import Markdown from 'react-markdown'

const Post = props => (
  <Layout>
    <h1>{props.show.name}</h1>
    <div className="markdown">
      <Markdown
        source={`
This is our blog post.
Yes. We can have a [link](/link).
And we can have a title as well.
        `}
      />
    </div>
    <p>{props.show.summary.replace(/<[/]?p>/, '')}</p>
    <img src={props.show.image.medium} />
    <style jsx global>{`
      .markdown {
        font-family: 'Arial';
      }
      .markdown a {
        text-decoration: none;
        color: blue;
      }
      .markdown a:hover {
        opacity: 0.6;
      }
      .markdown h3 {
        margin: 0;
        padding: 0;
        text-transform: uppercase;
      }
    `}</style>
  </Layout>
)

Post.getInitialProps = async function(context) {
  const { id } = context.query
  const res = await Axios(`https://api.tvmaze.com/shows/${id}`)
  const show = await res.data

  console.log(`Fetched show: ${show.name}`)

  return { show }
}

export default Post