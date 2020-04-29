import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import NativeVlcPlayer from './src/NativeVlcPlayer';

export const DeviceOrientation = Orientation.DeviceOrientation;
export const SURFACE_BEST_FIT = 0;
export const SURFACE_FIT_HORIZONTAL = 1;
export const SURFACE_FIT_VERTICAL = 2;
export const SURFACE_FILL = 3;
export const SURFACE_16_9 = 4;
export const SURFACE_4_3 = 5;
export const SURFACE_ORIGINAL = 6;

class VlcPlayer extends Component {
  static propTypes = {
    style: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }),
    paused: PropTypes.bool,
  };

  static defaultProps = {
    style: {
      width: 0,
      height: 0,
    },
    paused: false,
  };

  state = {
    hidden: false,
    width: this.props.style.width,
    height: this.props.style.height,
  };

  shouldComponentUpdate(nextProps) {
    if (
      this.props.style.width !== nextProps.style.width ||
      this.props.style.height !== nextProps.style.height
    )
      this.setState({
        width: nextProps.style.width,
        height: nextProps.style.height,
      });

    return true;
  }

  render() {
    const { forwardRef, style, ...rest } = this.props;
    const { width, height } = this.state;

    return (
      <NativeVlcPlayer
        {...rest}
        ref={forwardRef}
        style={{
          ...style,
          width,
          height,
        }}
      />
    );
  }
}

export default React.forwardRef((props, ref) => (
  <VlcPlayer {...props} forwardRef={ref} />
));
