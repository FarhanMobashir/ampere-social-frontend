import React from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const modalRoot: any = document.getElementById("modal");

const ModalDiv = styled.div`
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Modal = ({ children }: { children: React.ReactNode }) => {
  const elementRef: any = React.useRef(null);
  if (!elementRef.current) {
    elementRef.current = document.createElement("div");
  }
  React.useEffect(() => {
    modalRoot.appendChild(elementRef.current);
    return () => modalRoot.removeChild(elementRef.current);
  }, []);
  // top level element needs to be single element
  return createPortal(<ModalDiv>{children}</ModalDiv>, elementRef.current);
};
