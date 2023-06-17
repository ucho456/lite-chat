import styled from "styled-components";
import { hover } from "@/utils/style/mixins";
import {
  colors,
  containerMaxWidth,
  fontColors,
  headerHeight,
} from "@/utils/style/variables";

export const PhoneHeaderStyled = styled.div`
  height: ${headerHeight};
  background-color: ${colors.primary};
  .container {
    display: grid;
    grid-template-columns: 50px 210px auto;
    grid-template-rows: 50px;
    max-width: ${containerMaxWidth};
    height: 100%;
    margin: 0 auto;
    .leave-column {
      grid-column: 1 / 2;
      .MuiButtonBase-root {
        ${hover}
        .MuiSvgIcon-root {
          path {
            color: ${fontColors.white} !important;
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
