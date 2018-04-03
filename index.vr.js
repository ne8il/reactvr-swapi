import React from "react";
import {
  AppRegistry,
  Animated,
  asset,
  Pano,
  Text,
  VrButton,
  VideoPano,
  View,
  Scene
} from "react-vr";

const AnimatedScene = Animated.createAnimatedComponent(Scene);

export default class WelcomeToVR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movement: new Animated.Value(0),
      red: new Animated.Value(2),
      bounceValue: new Animated.Value(-6),
      rotation: new Animated.Value(0),
      rotation2: new Animated.Value(-12)
    };
  }

  componentDidMount() {
    this._bounce();
    // this.rotate();
  }

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

  render() {
    return (
      <AnimatedScene
        style={{
          transform: [
            { translate: [0, 0, this.state.movement] },
            { rotateY: this.state.rotation }
          ]
        }}
      >
        <VideoPano source={asset("space.webm")} loop={true}>
          <View>
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
        </VideoPano>
      </AnimatedScene>
    );
  }
}

AppRegistry.registerComponent("WelcomeToVR", () => WelcomeToVR);
