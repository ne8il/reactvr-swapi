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
      climates: PropTypes.string,
      terrains: PropTypes.string,
      surfaceWater: PropTypes.number
    }),
    onEnter: PropTypes.func,
    onExit: PropTypes.func,
    onClick: PropTypes.func
  };
  constructor(props) {
    super(props);
    const radius = props.radius || Math.min(2, props.planet.diameter / 12000);

    this.state = {
      color: getColor(),
      radius: new Animated.Value(radius),
      spin: new Animated.Value(0)
    };
  }

  componentDidMount() {
    this.spinAnimation();
  }

  bounce = () => {
    // console.log('bouncing');
    // console.log(this.state.radius);
    const initial = this.state.radius._startingValue;
    // this.state.radius.setValue(initial * 2);
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
    const { color } = this.state;
    const { translate, onEnter, onExit, onClick, planet } = this.props;

    const texture = getTexture(planet.id);
    const spin = this.state.spin.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    return (
      <VrButton style={{ transform: [{ translate }] }} onClick={this.bounce}>
        <AnimatedSphere
          lit={true}
          onEnter={e => {
            onEnter();
          }}
          onExit={e => {
            onExit();
          }}
          radius={this.state.radius}
          texture={texture}
          widthSegments={10}
          heightSegments={10}
          style={{
            transform: [{ rotateY: spin }]
          }}
        />
      </VrButton>
    );
  }
}

const getColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

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
  temperate: '',
  tropical: '',
  frozen: '',
  murky: '',
  windy: '',
  hot: '',
  'artificial temperate': '',
  frigid: '',
  humid: '',
  moist: '',
  polluted: '',
  unknown: '',
  superheated: '',
  subartic: '',
  artic: '',
  rocky: ''
};
