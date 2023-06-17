import styled from "styled-components";
import { hover } from "@/utils/style/mixins";
import {
  colors,
  containerMaxWidth,
  fontColors,
  headerHeight,
} from "@/utils/style/variables";

export const RoomsHeaderStyled = styled.div`
  height: ${headerHeight};
  background-color: ${colors.primary};
  position: relative;
  top: 0;
  .container {
    display: grid;
    grid-template-columns: 210px auto 50px;
    grid-template-rows: ${headerHeight};
    max-width: ${containerMaxWidth};
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
            color: ${fontColors.white} !important;
          }
        }
      }
    }
  }
`;
