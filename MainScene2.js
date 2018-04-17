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

export default class MainScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlanetId: null,
      translateX: new Animated.Value(0),
      translateY: new Animated.Value(0),
      translateZ: new Animated.Value(0),
      rotation: new Animated.Value(0)
    };
  }

  planetRefs = [];

  _bounce() {
    this.state.bounceValue.setValue(-12); // Start large
    Animated.spring(
      // Base: spring, decay, timing
      this.state.bounceValue, // Animate `bounceValue`
      {
        toValue: -4, // Animate to smaller size
        friction: 1 // Bouncier spring
      }
    ).start();
  }

  rotate() {
    Animated.timing(this.state.rotation, {
      toValue: 1,
      duration: 1000
    }).start();
    Animated.timing(this.state.movement, {
      toValue: -8,
      duration: 1000
    }).start();
    // Animated.timing(this.state.rotation2, {
    //   toValue: 5,
    //   duration: 1000
    // }).start();
  }

  _onBackClicked() {
    this.state.level.setValue(0);
    Animated.spring(
      // Base: spring, decay, timing
      this.state.level, // Animate `bounceValue`
      {
        toValue: 0, // Animate to smaller size
        friction: 1 // Bouncier spring
      }
    ).start();
  }

  _onViewClicked() {
    this.rotate();
    /*
    this.state.red.setValue(-10); // Start large
    Animated.decay(this.state.red, {
      velocity: 10,
      deceleration: 0.997
    }).start();
    */
  }

  moveTo(x, y, z) {
    console.log(`move to ${x}, ${y}, ${z}`);
    this.state.translateX.setValue(x);
    this.state.translateY.setValue(y);
    this.state.translateZ.setValue(z);
  }

  render() {
    const { currentPlanet } = this.state;
    return (
      <AnimatedScene
        style={{
          transform: [
            {
              translate: [this.state.translateX, this.state.translateY, this.state.translateZ]
            },
            { rotateY: this.state.rotation }
          ]
        }}
      >
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
                      onEnter={() => {
                        this.setState({ currentPlanet: planet });
                      }}
                      onExit={() => {
                        this.setState({ currentPlanet: null });
                      }}
                      onClick={() => {
                        const translate = this.planetRefs[planet.id].getTranslate();
                        this.moveTo(...translate);
                      }}
                      onBack={() => {
                        this.moveTo(0, 0, 0);
                      }}
                    />
                  ))}
                </View>
              );
            }}
          </Query>
          {/* <View>
            <VrButton onClick={() => this._onViewClicked()}>
              <Animated.Text
                style={{
                  backgroundColor: "#777879",
                  fontSize: 0.8,
                  fontWeight: "400",
                  layoutOrigin: [0.5, 0.5],
                  paddingLeft: 0.2,
                  paddingRight: 0.2,
                  textAlign: "center",
                  textAlignVertical: "center",
                  transform: [
                    { translate: [0, 0, -6] },
                    { rotateY: this.state.rotation }
                  ]
                }}
              >
                foreground
              </Animated.Text>
            </VrButton>

            <VrButton onClick={() => this._onBackClicked()}>
              <Animated.Text
                style={{
                  backgroundColor: "red",
                  fontSize: 0.8,
                  fontWeight: "400",
                  layoutOrigin: [0.5, 0.5],
                  paddingLeft: 0.2,
                  paddingRight: 0.2,
                  textAlign: "center",
                  textAlignVertical: "center",
                  transform: [
                    { translate: [0, 0, -12] },
                    { rotateY: this.state.rotation }
                  ]
                }}
              >
                background
              </Animated.Text>
            </VrButton>
          </View>
          */}
        </Pano>
      </AnimatedScene>
    );
  }
}
