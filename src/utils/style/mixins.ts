import { css } from "styled-components";

export const hover = css`
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;

export const screenUnder = (px: number) => {
  return `@media (max-width: ${px}px)`;
};

export const pc = (content: string) => {
  return `
    @media (max-width: 1280px) {
      ${content}
    }
  `;
};

export const wideTab = (content: string) => {
  return `
    @media (max-width: 1024px) {
      ${content}
    }
  `;
};

export const tab = (content: string) => {
  return `
    @media (max-width: 768px) {
      ${content}
    }
  `;
};

export const wideSp = (content: string) => {
  return `
    @media (max-width: 690px) {
      ${content}
    }
  `;
};

export const sp = (content: string) => {
  return `
    @media (max-width: 479px) {
      ${content}
    }
  `;
};
