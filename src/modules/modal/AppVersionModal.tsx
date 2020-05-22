import compareVersions from "compare-versions";
import React, { useCallback, useState, useEffect } from "react";
import { Linking, Modal, Platform } from "react-native";
import Constants from "expo-constants";
import styled from "styled-components/native";
import { useAppContext } from "../app/AppContext";

// @ts-ignore
export const AppVersionModal: React.FC<{ loadingComponent: JSX.Element }> = (
  props
) => {
  const { handleGetMinimalAvailableVersion, loading } = useAppContext();
  const [minimumAvailableVersion, setMinimumAvailableVersion] = useState<
    string
  >("0.0.0");

  useEffect(() => {
    const init = async () => {
      const version = await handleGetMinimalAvailableVersion();
      setMinimumAvailableVersion(version);
    };
    init();
  }, []);

  const onPress = useCallback(() => {
    if (Platform.OS === "android") {
      Linking.canOpenURL(`market://details?id=${1}`)
        .then(() => {
          Linking.openURL(`market://details?id=${1}`);
        })
        .catch();
    } else if (Platform.OS === "ios") {
      Linking.canOpenURL(`itms://itunes.apple.com/us/app/apple-store/${1}`)
        .then(() =>
          Linking.openURL(
            `itms://itunes.apple.com/us/app/apple-store/id1485216306`
          )
        )
        .catch();
    }
  }, []);

  if (
    compareVersions.compare(
      Constants.nativeAppVersion!,
      minimumAvailableVersion,
      "<"
    )
  ) {
    return (
      <>
        {props.loadingComponent}
        <Modal animationType="fade" transparent={true}>
          <ModalWrapper>
            <Card>
              <Title>Your version is outdated !</Title>
              <RedirectButton onPress={onPress}>
                <RedirectButtonText>Redirect to the store</RedirectButtonText>
              </RedirectButton>
            </Card>
          </ModalWrapper>
        </Modal>
      </>
    );
  } else if (loading) {
    return props.loadingComponent;
  } else {
    return props.children;
  }
};

const ModalWrapper = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  padding-horizontal: 15%;
  padding-vertical: 15%;
  background: rgba(0, 0, 0, 0.4);
`;
const Card = styled.View`
  align-items: center;
  background-color: white;
  border-radius: 10;
  flex: 1;
  max-height: 350px;
  min-height: 300px;
  min-width: 100%;
  max-width: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
`;

const RedirectButton = styled.TouchableOpacity`
  align-items: center;
  background: #172b49;
  height: 30px;
  padding-horizontal: 5px;
  justify-content: center;
  width: auto;
`;
const RedirectButtonText = styled.Text`
  color: #f4f5fd;
  font-weight: bold;
`;
const Title = styled.Text`
  font-size: 22;
  font-weight: bold;
  text-align: center;
`;
