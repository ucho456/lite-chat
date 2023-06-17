import styled from "styled-components";
import { hover } from "@/utils/style/mixins";
import {
  CONTAINER_MAX_WIDTH,
  FONT_COLOR_WHITE,
  HEADER_HEIGHT,
  PRIMARY,
} from "@/utils/style/variables";

export const PhoneHeaderStyled = styled.div`
  height: ${HEADER_HEIGHT};
  background-color: ${PRIMARY};
  .container {
    display: grid;
    grid-template-columns: 50px 210px auto;
    grid-template-rows: 50px;
    max-width: ${CONTAINER_MAX_WIDTH};
    height: 100%;
    margin: 0 auto;
    .leave-column {
      grid-column: 1 / 2;
      .MuiButtonBase-root {
        ${hover}
        .MuiSvgIcon-root {
          path {
            color: ${FONT_COLOR_WHITE} !important;
          }
        }
      }
    }
    .photo-column {
      grid-column: 2 / 3;
      padding: 5px 0 0 5px;
    }
  }
`;
