import React from 'react';
import { AmbientLight, asset, Pano, View, Scene } from 'react-vr';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Planet from './components/Planet';
import PlanetName from './components/PlanetName';
import DeathStar from './components/DeathStar';

const PLANET_QUERY = gql`
  query Planets {
    allPlanets {
      planets {
        name
        id
        diameter
        climates
        terrains
        rotationPeriod
        population
      }
    }
  }
`;

const MAX_DISTANCE = 25;
const MIN_DISTANCE = 10;

const getTranslate = () => [
  genPos(MIN_DISTANCE, MAX_DISTANCE), // x
  genPos(MIN_DISTANCE, MAX_DISTANCE), // y
  genPos(MIN_DISTANCE, MAX_DISTANCE) // z
];
const genPos = (min, range) =>
  Math.max(min, Math.random() * range) * (Math.random() > 0.5 ? 1 : -1);

const TRANSLATE_ARRAY = [];
for (let i = 0; i <= 100; i++) {
  TRANSLATE_ARRAY.push(getTranslate());
}

export default class MainScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlanet: null
    };
  }

  render() {
    const { currentPlanet } = this.state;
    return (
      <Scene>
        <AmbientLight decay={2} distance={10} intensity={1} />
        {currentPlanet ? <PlanetName planet={currentPlanet} /> : null}
        <Pano source={asset('textures/milky_way.jpg')}>
          <Query query={PLANET_QUERY}>
            {({ loading, error, data = [] }) => {
              if (loading || error || !data.allPlanets) return null;

              return (
                <View>
                  {data.allPlanets.planets.map((planet, index) => (
                    <Planet
                      key={planet.id}
                      planet={planet}
                      translate={TRANSLATE_ARRAY[index]}
                      onEnter={() => {
                        this.setState({
                          currentPlanet: planet
                        });
                      }}
                      onExit={() => {
                        this.setState({
                          currentPlanet: null
                        });
                      }}
                    />
                  ))}
                </View>
              );
            }}
          </Query>
          <DeathStar />
        </Pano>
      </Scene>
    );
  }
}
