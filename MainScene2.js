import React from 'react';
import { View, Scene, Text } from 'react-vr';
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

export default class MainScene extends React.Component {
  render() {
    return (
      <Scene>
        <Query query={PLANET_QUERY}>
          {({ loading, error, data = [] }) => {
            if (loading || error || !data.allPlanets) return null;

            return (
              <View>
                {data.allPlanets.planets.map((planet, index) => {
                  return (
                    <Text
                      style={{
                        layoutOrigin: [0.5, 0.5],
                        transform: [
                          { translate: [0, 3 + 0.5 * index, -(0.5 * index)] }
                        ]
                      }}
                      key={planet.id}
                    >
                      {planet.name}
                    </Text>
                  );
                })}
              </View>
            );
          }}
        </Query>
      </Scene>
    );
  }
}
