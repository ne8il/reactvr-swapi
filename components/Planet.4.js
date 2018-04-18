import React, { Component } from 'react';
import { Animated, asset, Sphere, VrButton } from 'react-vr';
import { Easing } from 'react-native';
import PropTypes from 'prop-types';

const AnimatedSphere = Animated.createAnimatedComponent(Sphere);

export default class Planet extends Component {
  static propTypes = {
    planet: PropTypes.shape({
      name: PropTypes.string,
      diameter: PropTypes.number,
      rotationPeriod: PropTypes.number,
      population: PropTypes.number,
      climates: PropTypes.array,
      terrains: PropTypes.string,
      surfaceWater: PropTypes.number
    }),
    onEnter: PropTypes.func,
    onExit: PropTypes.func,
    translate: PropTypes.array
  };
  constructor(props) {
    super(props);
    const radius = Math.min(2, props.planet.diameter / 12000);

    this.state = {
      radius: new Animated.Value(radius),
      spin: new Animated.Value(0),
      hover: false
    };
  }

  componentDidMount() {
    this.spinAnimation();
  }

  bounce = () => {
    const initial = this.state.radius._startingValue;
    Animated.sequence([
      Animated.spring(this.state.radius, {
        toValue: initial * 2,
        friction: 1
      }),
      Animated.spring(this.state.radius, {
        toValue: initial,
        friction: 1
      })
    ]).start();
  };

  spinAnimation() {
    const { rotationPeriod } = this.props.planet;
    this.state.spin.setValue(0);
    Animated.timing(this.state.spin, {
      toValue: 1,
      duration: (rotationPeriod || 5) * 1000,
      easing: Easing.linear
    }).start(() => this.spinAnimation());
  }

  render() {
    const { translate, planet } = this.props;

    const texture = getTexture(planet.id);
    const { climates } = planet;
    const color = `${climateColorMap[climates[climates.length - 1]]}1a`;
    const spin = this.state.spin.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    return (
      <VrButton style={{ transform: [{ translate }] }} onClick={this.bounce}>
        <AnimatedSphere
          lit={true}
          onEnter={e => {
            this.setState({ hover: true });
          }}
          onExit={e => {
            this.setState({ hover: false });
          }}
          wireframe={this.state.hover}
          radius={this.state.radius}
          texture={texture}
          widthSegments={10}
          heightSegments={10}
          style={{
            transform: [{ rotateY: spin }],
            color
          }}
        />
      </VrButton>
    );
  }
}

const textures = [
  asset('textures/ceres.jpg'),
  asset('textures/eris.jpg'),
  asset('textures/haumea.jpg'),
  asset('textures/makemake.jpg'),
  asset('textures/mars.jpg'),
  asset('textures/mercury.jpg'),
  asset('textures/moon.jpg'),
  asset('textures/neptune.jpg'),
  asset('textures/venus.jpg'),
  asset('textures/venusatmosphere.jpg')
];

const getTexture = id => {
  const hash = hashCode(id);
  return textures[Math.abs(hash % textures.length)];
};

const hashCode = str => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

const climateColorMap = {
  arid: '#f1ef7e',
  temperate: '#668D30',
  tropical: '#aaf992',
  frozen: '#b3d9ec',
  murky: '#a09554',
  windy: '#e5f9f4',
  hot: '#ffe4a4',
  'artificial temperate': '#5a5a5a',
  frigid: '#aeb6b9',
  humid: '#ffd801',
  moist: '#6a9877',
  polluted: '#736564',
  unknown: '#a2a2a2',
  superheated: '#e20707',
  subartic: '#5e7686',
  artic: '#5e7686',
  rocky: '#887954'
};
