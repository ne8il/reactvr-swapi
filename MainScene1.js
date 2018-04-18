import React from 'react';
import { Animated, asset, VrButton, VideoPano, View, Scene } from 'react-vr';

const AnimatedScene = Animated.createAnimatedComponent(Scene);

export default class MainScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movement: new Animated.Value(0),
      rotation: new Animated.Value(0)
    };
  }

  moveTo(endPos) {
    Animated.timing(this.state.rotation, {
      toValue: 1,
      duration: 1000
    }).start();
    Animated.timing(this.state.movement, {
      toValue: endPos,
      duration: 1000
    }).start();
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
        <VideoPano source={asset('space.webm')} loop={true}>
          <View>
            <VrButton onClick={() => this.moveTo(-8)}>
              <Animated.Text
                style={{
                  backgroundColor: '#777879',
                  fontSize: 0.8,
                  fontWeight: '400',
                  layoutOrigin: [0.5, 0.5],
                  paddingLeft: 0.2,
                  paddingRight: 0.2,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  transform: [
                    { translate: [0, 0, -6] },
                    { rotateY: this.state.rotation }
                  ]
                }}
              >
                foreground
              </Animated.Text>
            </VrButton>

            <VrButton onClick={() => this.moveTo(0)}>
              <Animated.Text
                style={{
                  backgroundColor: 'red',
                  fontSize: 0.8,
                  fontWeight: '400',
                  layoutOrigin: [0.5, 0.5],
                  paddingLeft: 0.2,
                  paddingRight: 0.2,
                  textAlign: 'center',
                  textAlignVertical: 'center',
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
