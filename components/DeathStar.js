import React, { Component } from 'react';
import { asset, Model } from 'react-vr';

export default class DeathStar extends Component {
  render() {
    return (
      <Model
        lit={true}
        source={{
          obj: asset('models/deathstar/death-star.obj')
          // mtl: asset('models/deathstar/death-star.mtl')
        }}
        style={{
          transform: [{ translate: [-5, 2, -5] }, { rotateY: '170deg' }]
        }}
        texture={'https://s3-us-west-2.amazonaws.com/s.cdpn.io/827672/death-star.png'}
      />
    );
  }
}
