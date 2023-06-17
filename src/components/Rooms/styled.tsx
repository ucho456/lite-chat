import styled from "styled-components";
import { hover } from "@/utils/style/mixins";
import { colors, containerMaxWidth, fontColors } from "@/utils/style/variables";

export const RoomsStyled = styled.div`
  background-color: ${colors.ghostWhite};
  .spacer {
    height: 10px;
  }
  .list {
    min-height: calc(100vh - 60px);
    max-width: ${containerMaxWidth};
    width: 100%;
    margin: 0 auto;
    p {
      text-align: center;
      color: ${fontColors.red};
      font-size: 12px;
      span {
        span {
          color: ${fontColors.blue};
          ${hover};
        }
      }
    }
  }
`;
