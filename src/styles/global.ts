import {createGlobalStyle} from "styled-components";
import RobotoMonoTTFBold from "../assets/fonts/RobotoMono-Bold.ttf";
import RobotoMonoTTFMedium from "../assets/fonts/RobotoMono-Medium.ttf";
import RobotoMonoTTFLight from "../assets/fonts/RobotoMono-Light.ttf";

export const GlobalStyle = createGlobalStyle`
  @font-face {
        font-family: 'RobotoMonoTTFBold';
        src: local('RobotoMonoTTFBold'), local('RobotoMonoTTFBold');
        font-style: normal;
        src: url(${RobotoMonoTTFBold}) format('truetype');
  }
  @font-face {
        font-family: 'RobotoMonoTTFMedium';
        src: local('RobotoMonoTTFMedium'), local('RobotoMonoTTFMedium');
        font-style: normal;
        src: url(${RobotoMonoTTFMedium}) format('truetype');
  }
  @font-face {
        font-family: 'RobotoMonoTTFLight';
        src: local('RobotoMonoTTFLight'), local('RobotoMonoTTFLight');
        font-style: normal;
        src: url(${RobotoMonoTTFLight}) format('truetype');
  }`;
