import React from 'react'
import Link from 'next/link'

const Index = () => (
  <ul>
    <li>
      <Link href="/about">
        <a>About</a>
      </Link>
    </li>
    <li>
      <Link href={{ pathname: '/post', query: { id: '2' } }} as="/post/2">
        <a>post #2</a>
      </Link>
    </li>
  </ul>
)

export default Index