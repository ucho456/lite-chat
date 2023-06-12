import styled from "styled-components";
import { CONTAINER_MAX_WIDTH, GHOST_WHITE, GRAY, PRIMARY, WHITE } from "@/utils/style/variables";

export const ListStyled = styled.div`
  background-color: ${WHITE};
  height: calc(100vh - (50px + 70px));
  .container {
    margin: 0 auto;
    max-width: ${CONTAINER_MAX_WIDTH};
    height: 100%;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-track {
      background-color: ${GHOST_WHITE};
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${PRIMARY};
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
      background-color: ${PRIMARY};
      position: relative;
      p {
        color: ${WHITE};
        &::before {
          clip-path: polygon(0% 0%, 0% 100%, 100% 50%);
          right: -8px;
          content: "";
          display: block;
          width: 10px;
          height: 8px;
          background-color: ${PRIMARY};
          position: absolute;
        }
      }
    }
    .left {
      margin: 10px auto 10px 15px;
      background-color: ${GRAY};
      position: relative;
      p {
        &::before {
          clip-path: polygon(100% 0%, 0% 50%, 100% 100%);
          left: -8px;
          content: "";
          display: block;
          width: 10px;
          height: 8px;
          background-color: ${GRAY};
          position: absolute;
        }
      }
    }
  }
`