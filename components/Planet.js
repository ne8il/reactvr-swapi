import React, { Component } from 'react';
import { Sphere, Text, View } from 'react-vr';
import PropTypes from 'prop-types';

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
    })
  };
  constructor(props) {
    super(props);

    const distance = 25;
    const min = 10;
    const posX = genPos(min, distance);
    const posY = genPos(min, distance);
    const posZ = genPos(min, distance);
    this.state = {
      translate: [posX, posY, posZ],
      color: getColor()
    };
  }

  render() {
    const { translate, color } = this.state;
    const { onEnter, onExit, planet } = this.props;
    const radius = planet.diameter / 12000;
    return (
      <View style={{ transform: [{ translate }] }}>
        <Sphere
          lit={true}
          onEnter={e => {
            console.log(`enter planet ${planet.name}`);
            onEnter();
          }}
          onExit={e => {
            console.log(`exit planet ${planet.name}`);
            onExit();
          }}
          radius={radius}
          widthSegments={10}
          heightSegments={10}
          style={{
            color
          }}
        />
      </View>
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

const genPos = (min, range) => Math.max(10, Math.random() * range) * (Math.random() > 0.5 ? 1 : -1);
