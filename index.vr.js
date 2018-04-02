import React from "react";
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  VrButton,
  VideoPano,
  View,
  Scene
} from "react-vr";

export default class WelcomeToVR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      z: 0
    };
  }

  _onBackClicked() {
    this.setState({ z: 0 });
  }

  _onViewClicked() {
    this.setState({ z: -6 });
  }

  render() {
    const z = this.state.z;
    return (
      <Scene style={{ transform: [{ translate: [0, 0, z] }] }}>
        <VideoPano source={asset("space.webm")} loop={true}>
          <View>
            <VrButton onClick={() => this._onViewClicked()}>
              <Text
                style={{
                  backgroundColor: "#777879",
                  fontSize: 0.8,
                  fontWeight: "400",
                  layoutOrigin: [0.5, 0.5],
                  paddingLeft: 0.2,
                  paddingRight: 0.2,
                  textAlign: "center",
                  textAlignVertical: "center",
                  transform: [{ translate: [0, 0, -6] }]
                }}
              >
                hello out there
              </Text>
            </VrButton>

            <VrButton onClick={() => this._onBackClicked()}>
              <Text
                style={{
                  backgroundColor: "red",
                  fontSize: 0.8,
                  fontWeight: "400",
                  layoutOrigin: [0.5, 0.5],
                  paddingLeft: 0.2,
                  paddingRight: 0.2,
                  textAlign: "center",
                  textAlignVertical: "center",
                  transform: [{ translate: [0, 2, -12] }]
                }}
              >
                hi
              </Text>
            </VrButton>
          </View>
        </VideoPano>
      </Scene>
    );
  }
}

AppRegistry.registerComponent("WelcomeToVR", () => WelcomeToVR);
