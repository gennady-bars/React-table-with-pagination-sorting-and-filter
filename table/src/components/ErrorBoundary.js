import React, { Component } from 'react'

export default class ErrorBoundary extends Component {

  state = {
    error: false
  }

  componentDidCatch() {
    this.setState({
      error: true
    })
  }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}