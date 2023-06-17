import styled from "styled-components";
import { hover } from "@/utils/style/mixins";
import { fontColors, headerHeight } from "@/utils/style/variables";

export const DialogStyled = styled.div`
  .user-column {
    height: ${headerHeight};
    padding: 5px;
    display: flex;
    ${hover}
    .name {
      line-height: 40px;
      margin-left: 5px;
      color: ${fontColors.white};
    }
  }
`;
