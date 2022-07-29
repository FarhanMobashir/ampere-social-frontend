import React from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const MasonryGrid = ({ children }: { children: React.ReactNode }) => {
  return <MainContainer>{children}</MainContainer>;
};
