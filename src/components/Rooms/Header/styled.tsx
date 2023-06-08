import styled from "styled-components";
import { hover } from "@/utils/style/mixins";
import {
  CONTAINER_MAX_WIDTH,
  FONT_COLOR_WHITE,
  HEADER_HEIGHT,
  PRIMARY,
} from "@/utils/style/variables";

export const RoomsHeaderStyled = styled.div`
  height: ${HEADER_HEIGHT};
  background-color: ${PRIMARY};
  position: relative;
  top: 0;
  .container {
    display: grid;
    grid-template-columns: 210px auto 50px;
    grid-template-rows: ${HEADER_HEIGHT};
    max-width: ${CONTAINER_MAX_WIDTH};
    height: 100%;
    margin: 0 auto;
    .user-column {
      grid-column: 1 / 2;
    }
    .leave-column {
      grid-column: 3 / 4;
      .MuiButtonBase-root {
        ${hover}
        .MuiSvgIcon-root {
          path {
            color: ${FONT_COLOR_WHITE} !important;
          }
        }
      }
    }
  }
`;
