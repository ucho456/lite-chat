import styled from "styled-components";
import { formHeight } from "@/components/Room/Form/styled";
import {
  colors,
  containerMaxWidth,
  headerHeight,
} from "@/utils/style/variables";

export const ListStyled = styled.div`
  background-color: ${colors.white};
  height: calc(100vh - (${headerHeight} + ${formHeight}));
  .container {
    margin: 0 auto;
    max-width: ${containerMaxWidth};
    height: 100%;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-track {
      background-color: ${colors.ghostWhite};
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${colors.primary};
      border-radius: 10px;
    }
    .room-message {
      padding: 5px;
      max-width: 60%;
      width: fit-content;
      border-radius: 7px;
      word-break: break-all;
    }
    .right {
      margin: 10px 15px 10px auto;
      background-color: ${colors.primary};
      position: relative;
      p {
        color: ${colors.white};
        &::before {
          clip-path: polygon(0% 0%, 0% 100%, 100% 50%);
          right: -8px;
          content: "";
          display: block;
          width: 10px;
          height: 8px;
          background-color: ${colors.primary};
          position: absolute;
        }
      }
    }
    .left {
      margin: 10px auto 10px 15px;
      background-color: ${colors.gray};
      position: relative;
      p {
        &::before {
          clip-path: polygon(100% 0%, 0% 50%, 100% 100%);
          left: -8px;
          content: "";
          display: block;
          width: 10px;
          height: 8px;
          background-color: ${colors.gray};
          position: absolute;
        }
      }
    }
  }
`;
