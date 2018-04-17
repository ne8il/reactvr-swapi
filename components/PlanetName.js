import React from 'react';
import {
  AppRegistry,
  AmbientLight,
  Animated,
  asset,
  Pano,
  PointLight,
  Text,
  VrButton,
  VrHeadModel,
  View,
  Scene
} from 'react-vr';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Planet from './Planet';

const PlanetName = ({ planet }) => {
  const hmMatrix = VrHeadModel.getHeadMatrix();

  return (
    <View
      style={{
        position: 'absolute',
        layoutOrigin: [0, 1],
        transform: [{ translate: [0, 0, 0] }, { matrix: hmMatrix }]
      }}
    >
      <Planet planet={planet} radius={0.3} translate={[-1, -0.5, -2]} />
      <Text
        style={{
          position: 'absolute',
          layoutOrigin: [0.5, 0.5],
          color: 'white',
          backgroundColor: 'black',
          fontSize: 0.2,
          transform: [{ translate: [-1, -1, -2] }]
        }}
      >
        {planet.name}
      </Text>
    </View>
  );
};

export default PlanetName;
