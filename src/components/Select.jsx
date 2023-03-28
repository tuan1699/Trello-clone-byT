import React, { memo, useEffect, useRef, useState } from "react";

const Select = (props) => {
  const {
    children,
    handleOpenMorebtn,
    handleCloseMoreBtn,
    isOpen,
    getPos,
  } = props;

  const moreBtnRef = useRef(null);
  const board = document.querySelector("#board");

  useEffect(() => {
    board.addEventListener("scroll", () => {
      if (moreBtnRef && moreBtnRef.current) {
        const {
          left,
          top,
          height,
        } = moreBtnRef.current.getBoundingClientRect();
        getPos(left, top, height);
      }
    });
  }, [isOpen]);

  const toggleTooltip = () => {
    if (isOpen) {
      handleCloseMoreBtn();
    } else {
      handleOpenMorebtn();
    }
  };

  return React.cloneElement(children, {
    ref: moreBtnRef,
    onClick: toggleTooltip,
  });
};

export default Select;
