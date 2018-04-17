import React from 'react';
import {
  AppRegistry,
  AmbientLight,
  Animated,
  asset,
  DirectionalLight,
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
import { times } from 'lodash';

import Planet from './components/Planet';
import PlanetName from './components/PlanetName';

const AnimatedScene = Animated.createAnimatedComponent(Scene);
const AnimatedPointLight = Animated.createAnimatedComponent(PointLight);

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
      }
    }
  }
`;

const distance = 25;
const min = 10;
const getTranslate = () => [genPos(min, distance), genPos(min, distance), genPos(min, distance)];
const genPos = (min, range) => Math.max(10, Math.random() * range) * (Math.random() > 0.5 ? 1 : -1);

const TRANSLATE_ARRAY = [];
for (let i = 0; i <= 100; i++) {
  TRANSLATE_ARRAY.push(getTranslate());
}

export default class MainScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlanetId: null,
      rotation: new Animated.Value(0)
    };
  }

  planetRefs = [];

  render() {
    const { currentPlanet } = this.state;
    return (
      <Scene>
        {currentPlanet ? <PlanetName planet={currentPlanet} /> : null}
        <AmbientLight decay={2} distance={10} intensity={1} />
        <Pano source={asset('textures/milky_way.jpg')}>
          <Query query={PLANET_QUERY}>
            {({ loading, error, data = [] }) => {
              if (loading || error || !data.allPlanets) return null;

              return (
                <View>
                  {data.allPlanets.planets.map((planet, index) => (
                    <Planet
                      key={planet.id}
                      ref={c => {
                        this.planetRefs[planet.id] = c;
                      }}
                      planet={planet}
                      translate={TRANSLATE_ARRAY[index]}
                      onEnter={() => {
                        this.setState({ currentPlanet: planet });
                      }}
                      onExit={() => {
                        this.setState({ currentPlanet: null });
                      }}
                      onClick={() => {
                        // this.setState({ currentPlanet: planet });
                      }}
                    />
                  ))}
                </View>
              );
            }}
          </Query>
        </Pano>
      </Scene>
    );
  }
}
