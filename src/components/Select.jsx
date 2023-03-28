import React, { useEffect, useRef } from "react";

const Select = (props) => {
  const {
    children,
    handleOpenMorebtn,
    handleCloseMoreBtn,
    isOpen,
    getPos,
  } = props;

  const moreBtnRef = useRef(null);

  useEffect(() => {
    const { left, top, height } = moreBtnRef.current.getBoundingClientRect();
    getPos(left, top, height);
  }, []);

  const toggleTooltip = () => {
    const testEl = document.body.querySelectorAll(".test-btn");
    if (testEl) {
      testEl.forEach((item) => item.remove());
    }
    window.addEventListener("click", (e) => {
      if (e.target.className === "more-btn") {
        if (isOpen) {
          console.log("check");
          handleCloseMoreBtn();
        } else {
          handleOpenMorebtn();
        }
      } else {
        handleCloseMoreBtn();
      }
    });
  };

  return React.cloneElement(children, {
    ref: moreBtnRef,
    onClick: toggleTooltip,
  });
};

export default Select;
