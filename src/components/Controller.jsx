import React, { Children, useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    setTimeout(() => {
      if (statusMoreBtn.isOpen) {
        window.addEventListener("click", handleCloseMoreBtn);
      } else {
        window.removeEventListener("click", handleCloseMoreBtn);
      }
    }, 0);

    return () => {
      window.removeEventListener("click", handleCloseMoreBtn);
    };
  }, [statusMoreBtn.isOpen]);

  const nodeRef = useRef(null);

  const handleOpenMorebtn = () => {
    setStatusMoreBtn({ ...statusMoreBtn, isOpen: true });
  };

  const handleCloseMoreBtn = () => {
    console.log("close button");
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
            ref={nodeRef}
          >
            {React.cloneElement(child, {
              handleCloseMoreBtn: handleCloseMoreBtn,
            })}
          </div>,
          document.body
        )
      );
    }
  });

  return inputChildren;
};
