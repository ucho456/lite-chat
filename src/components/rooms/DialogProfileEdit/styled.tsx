import styled from "styled-components";
import { hover } from "@/utils/style/mixins";
import { HEADER_HEIGHT } from "@/utils/style/variables";

export const DialogStyled = styled.div`
  .user-column {
    height: ${HEADER_HEIGHT};
    padding: 5px;
    display: flex;
    ${hover}
    .name {
      line-height: 40px;
      margin-left: 5px;
    }
  }
`;
