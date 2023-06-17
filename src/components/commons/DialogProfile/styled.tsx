import styled from "styled-components";
import { hover } from "@/utils/style/mixins";
import { fontWeight } from "@/utils/style/variables";

export const DialogProfileStyled = styled.div`
  .user-column {
    display: flex;
    ${hover}
    .name {
      line-height: 40px;
      margin-left: 8px;
      font-size: 15px;
    }
  }
`;

export const ContainerStyled = styled.div`
  width: 300px;
  grid-template-rows: 120px 300px;
  .photo-row {
    padding-top: 20px;
    height: 120px;
    grid-row: 1 / 2;
  }
  .profile-row {
    grid-row: 2 / 3;
    padding: 20px;
    .name {
      font-weight: ${fontWeight.bold};
    }
  }
`;
