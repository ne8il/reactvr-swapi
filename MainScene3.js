import React from 'react';
import { asset, Pano, View, Scene, Sphere } from 'react-vr';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const PLANET_QUERY = gql`
  query Planets {
    allPlanets {
      planets {
        id
        name
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
  render() {
    return (
      <Scene>
        <Pano source={asset('textures/milky_way.jpg')}>
          <Query query={PLANET_QUERY}>
            {({ loading, error, data = [] }) => {
              if (loading || error || !data.allPlanets) return null;

              return (
                <View>
                  {data.allPlanets.planets.map((planet, index) => (
                    <Sphere
                      key={planet.id}
                      wireframe={true}
                      radius={2}
                      widthSegments={10}
                      heightSegments={10}
                      style={{
                        transform: [{ translate: TRANSLATE_ARRAY[index] }],
                        color: 'red'
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
