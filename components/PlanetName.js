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

const PLANET_QUERY = gql`
  query Planet($id: ID) {
    planet(id: $id) {
      name
      climates
    }
  }
`;

const PlanetName = ({ planet }) => {
  console.log(VrHeadModel.rotation(), 'rotation');

  const [rotateX, rotateY, rotateZ] = VrHeadModel.rotation();
  return (
    <View
      style={{
        position: 'absolute',
        layoutOrigin: [0.5, 0.5],
        transform: [{ translate: [0, 0, 0] }, { rotateX }, { rotateY }, { rotateZ: 0 }]
      }}
    >
      <Text
        style={{
          position: 'absolute',
          layoutOrigin: [0.5, 0.5],
          backgroundColor: '#f00',
          transform: [{ translate: [0, 0, -2] }]
        }}
      >
        {planet.name}
      </Text>
    </View>
  );
};

export default PlanetName;
