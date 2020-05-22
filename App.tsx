import React from "react";
import styled from "styled-components/native";

import { AppVersionModal } from "./src/modules/modal/AppVersionModal";
import {
  useAppContextSubscriber,
  AppContextProvider,
} from "./src/modules/app/AppContext";

export default function App() {
  const appContext = useAppContextSubscriber();

  const LoadingComponent = <LoadingText>My splash Screen Loading</LoadingText>;

  return (
    <AppContextProvider value={appContext}>
      <WrappedSafeView>
        <AppVersionModal loadingComponent={LoadingComponent}>
          <TitleText>My super App !</TitleText>
        </AppVersionModal>
      </WrappedSafeView>
    </AppContextProvider>
  );
}

const WrappedSafeView = styled.SafeAreaView`
  flex: 1;
  background-color: #172b49;
`;
const TitleText = styled.Text`
  margin: auto;
  font-size: 30px;
  color: #f4f5fd;
`;
const LoadingText = styled.Text`
  margin: 0 auto;
  color: white;
  font-size: 22px;
`;
