import React from 'react'
import Link from 'next/link'
import Layout from '../components/MyLayout'
import Axios from 'axios'

const PostLink = ({ show }) => (
  <li>
    <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
      <a>{show.name}</a>
    </Link>
    <style jsx>{`
      li {
        list-style: none;
        margin: 5px 0;
      }
      a {
        text-decoration: none;
        color: blue;
      }
      a:hover {
        opacity: 0.6;
      }`}</style>
  </li>
)

const Index = props => {
  return (
    <Layout>
      <h1>Batman TV Shows</h1>
      <ul>
        {props.shows.map(({ show }) => (
          <PostLink key={show.id} show={show} />
        ))}
      </ul>
      <style jsx>{`
        h1,
        a {
          font-family: 'Arial';
        }
        ul {
          padding: 0;
        }
      `}</style>
    </Layout>
  )
}

Index.getInitialProps = async function() {
  const res = await Axios('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.data

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    shows: data
  }
}

export default Index