import React from 'react';
import { Text, VrHeadModel, View } from 'react-vr';
import numeral from 'numeral';

import Planet from './Planet';

const textStyle = {
  position: 'absolute',
  layoutOrigin: [0.5, 0.5],
  color: 'white',
  backgroundColor: 'black',
  fontSize: 0.2
};

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
          ...textStyle,
          fontSize: 0.3,
          transform: [{ translate: [-1, 0, -2] }]
        }}
      >
        {planet.name}
      </Text>
      <Text
        style={{
          ...textStyle,
          fontSize: 0.1,
          transform: [{ translate: [-1, -1, -2] }]
        }}
      >
        (pop: {numeral(planet.population).format('0.0a')})
      </Text>
    </View>
  );
};

export default PlanetName;
