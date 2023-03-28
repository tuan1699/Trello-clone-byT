import React, { Children, useEffect, useState } from "react";
import ReactDOM from "react-dom";

export const Controller = (props) => {
  const { children } = props;
  const [statusMoreBtn, setStatusMoreBtn] = useState({
    isOpen: false,
    style: {
      position: "absolute",
      top: 0,
      left: 0,
    },
    class: "check",
  });

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (statusMoreBtn.isOpen) {
  //       console.log("check");
  //       window.addEventListener("click", handleCloseMoreBtn);
  //     } else {
  //       console.log("check");
  //       window.removeEventListener("click", handleCloseMoreBtn);
  //     }
  //   }, 0);
  // }, [statusMoreBtn.isOpen]);

  const handleOpenMorebtn = () => {
    setStatusMoreBtn({ ...statusMoreBtn, isOpen: true });
  };

  const handleCloseMoreBtn = () => {
    setStatusMoreBtn({ ...statusMoreBtn, isOpen: false });
  };

  const getPos = (left, top, height) => {
    setStatusMoreBtn({
      ...statusMoreBtn,
      style: {
        ...statusMoreBtn.style,
        left,
        top: top + height,
      },
      class: "check",
    });
  };

  const inputChildren = Children.map(children, (child) => {
    if (child.type.name === "Select") {
      return React.cloneElement(child, {
        handleOpenMorebtn: handleOpenMorebtn,
        handleCloseMoreBtn: handleCloseMoreBtn,
        isOpen: statusMoreBtn.isOpen,
        getPos: getPos,
      });
    } else {
      return (
        statusMoreBtn.isOpen &&
        ReactDOM.createPortal(
          <div
            onClick={(e) => e.stopPropagation()}
            style={statusMoreBtn.style}
            className="test-btn"
          >
            {React.cloneElement(child)}
          </div>,
          document.body
        )
      );
    }
  });

  return inputChildren;
};
