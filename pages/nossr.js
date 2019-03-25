import React from 'react'
import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('../components/Modal'), {
  ssr: false
})

const NoSSR = props => {
  return (
    <div>
      <h1>With No SSR</h1>
      <DynamicComponentWithNoSSR />
    </div>
  )
}

export default NoSSR