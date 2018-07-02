import React, { Component } from 'react'
import spinner from './spinner.gif'

class componentName extends Component {
  render() {
    return (
      <div>
        <img
          src={spinner}
          style={{ width: '25px', margin: 'auto', display: 'block' }}
          alt="Loading..."
        />
      </div>
    )
  }
}

export default componentName
