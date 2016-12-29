import React from 'react'
import { Motion, spring } from 'react-motion'

export default class TouchableOpacity extends React.PureComponent {
  static propTypes = {
    minOpacity: React.PropTypes.number.isRequired,
    maxOpacity: React.PropTypes.number.isRequired,
    fadeOutDelay: React.PropTypes.number.isRequired,
  }

  static defaultProps = {
    minOpacity: 0.25,
    maxOpacity: 1,
    fadeOutDelay: 200,
  }

  state = {
    isMouseDown: false,
  }

  componentWillMount() {
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    window.addEventListener('mouseup', this.onMouseUp)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
    window.removeEventListener('mouseup', this.onMouseUp)
  }

  onMouseDown() {
    this.setState({ isMouseDown: true })
  }

  onMouseUp() {
    this.timeout = setTimeout(() => {
      this.setState({ isMouseDown: false })
    }, this.props.fadeOutDelay)
  }

  render() {
    const { minOpacity, maxOpacity, fadeOutDelay, style, ...props } = this.props

    return (
      <div style={style} onMouseDown={this.onMouseDown}>
        <Motion defaultStyle={{ opacity: maxOpacity }} style={{ opacity: spring(this.state.isMouseDown ? minOpacity : maxOpacity) }}>
          {animatedStyle => <div {...props} style={animatedStyle} />}
        </Motion>
      </div>
    )
  }
}
