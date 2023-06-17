import styled from "styled-components";
import { screenUnder } from "@/utils/style/mixins";
import {
  containerMaxWidth,
  colors,
  screenWidth,
} from "@/utils/style/variables";

export const VideosStyled = styled.div`
  min-height: calc(100vh - 50px);
  background-color: ${colors.primary};
  .videos-container {
    max-width: ${containerMaxWidth};
    margin: 0 auto;
    padding-top: 40px;
    text-align: center;
    video {
      width: 384px;
      height: 288px;
      border-radius: 10px;
      margin: 10px;
      ${screenUnder(screenWidth.sp)} {
        width: 320px;
        height: 240px;
      }
    }
    .buttons {
      width: 768px;
      margin: 0 auto;
      text-align: right;
      ${screenUnder(screenWidth.wideSp)} {
        width: 320px;
      }
      button {
        .MuiSvgIcon-root {
          path {
            color: ${colors.white};
          }
        }
      }
    }
  }
`;
