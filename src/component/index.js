import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import Check from './check'
import X from './x'
import shallowCompare from 'react-addons-shallow-compare'

export default class Toggle extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
    this.handleFocus = this.setState.bind(this, { hasFocus: true }, () => {})
    this.handleBlur = this.setState.bind(this, { hasFocus: false }, () => {})
    this.state = {
      checked: !!(props.checked || props.defaultChecked),
      hasFocus: false,
    }
  }

  componentWillReceiveProps (nextProps) {
    if ('checked' in nextProps) {
      this.setState({checked: !!nextProps.checked})
    }
  }

  handleClick (event) {
    console.log('click')
    const checkbox = this.input
    if (event.target !== checkbox) {
      event.preventDefault()
      checkbox.focus()
      checkbox.click()
      return
    }

    if (!('checked' in this.props)) {
      this.setState({checked: checkbox.checked})
    }
  }

  handleTouchStart (event) {
    console.log('handleTouchStart', event);
    // this._startX = pointerCoord(ev).x;
    // this._activated = true;
    // return true;
  }

  handleTouchMove (event) {
    console.log('handleTouchMove', event);
    // if (this._startX) {
    //   let currentX = pointerCoord(ev).x;
    //   console.debug('toggle, pointerMove', ev.type, currentX);

    //   if (this._checked) {
    //     if (currentX + 15 < this._startX) {
    //       this.onChange(false);
    //       this._haptic.selection();
    //       this._startX = currentX;
    //       this._activated = true;
    //     }

    //   } else if (currentX - 15 > this._startX) {
    //     this.onChange(true);
    //     // Create a haptic event
    //     this._haptic.selection();
    //     this._startX = currentX;
    //     this._activated = (currentX < this._startX + 5);
    //   }
    // }
  }

  handleTouchEnd (event) {
    console.log('handleTouchEnd', event);
    // if (this._startX) {
    //   let endX = pointerCoord(ev).x;

    //   if (this.checked) {
    //     if (this._startX + 4 > endX) {
    //       this.onChange(false);
    //       this._haptic.selection();
    //     }

    //   } else if (this._startX - 4 < endX) {
    //     this.onChange(true);
    //     this._haptic.selection();
    //   }

    //   this._activated = false;
    //   this._startX = null;
    // }
  }

  getIcon (type) {
    const { icons } = this.props
    if (!icons) {
      return null
    }
    return icons[type] === undefined
      ? Toggle.defaultProps.icons[type]
      : icons[type]
  }

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  render () {
    const { className, icons: _icons, ...inputProps } = this.props
    const classes = classNames('react-toggle', {
      'react-toggle--checked': this.state.checked,
      'react-toggle--focus': this.state.hasFocus,
      'react-toggle--disabled': this.props.disabled,
    }, className)

    return (
      <div className={classes}
        onClick={this.handleClick}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}>
        <div className='react-toggle-track'>
          <div className='react-toggle-track-check'>
            {this.getIcon('checked')}
          </div>
          <div className='react-toggle-track-x'>
            {this.getIcon('unchecked')}
          </div>
        </div>
        <div className='react-toggle-thumb' />

        <input
          {...inputProps}
          ref={ref => { this.input = ref }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          className='react-toggle-screenreader-only'
          type='checkbox' />
      </div>
    )
  }
}

Toggle.displayName = 'Toggle'

Toggle.defaultProps = {
  icons: {
    checked: <Check />,
    unchecked: <X />,
  },
}

Toggle.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string,
  'aria-labelledby': PropTypes.string,
  'aria-label': PropTypes.string,
  icons: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      checked: PropTypes.node,
      unchecked: PropTypes.node,
    }),
  ]),
}
