import styled from "styled-components";
import { sp, wideSp } from "@/utils/style/mixins"
import { CONTAINER_MAX_WIDTH, PRIMARY, WHITE } from "@/utils/style/variables";

export const VideosStyled = styled.div`
  min-height: calc(100vh - 50px);
  background-color: ${PRIMARY};
  .videos-container {
    max-width: ${CONTAINER_MAX_WIDTH};
    margin: 0 auto;
    padding-top: 40px;
    text-align: center;
    video {
      width: 384px;
      height: 288px;
      border-radius: 10px;
      margin: 10px;
      ${sp(`width: 320px; height: 240px;`)}
    }
    .buttons {
      width: 768px;
      margin: 0 auto;
      text-align: right;
      ${wideSp(`width: 320px;`)}
      ${sp(`width: 320px;`)}
      button {
        .MuiSvgIcon-root {
          path {
            color: ${WHITE};
          }
        }
      }
    }
  }
`