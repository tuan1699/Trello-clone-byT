import React, { useState } from "react";
import styled from "styled-components";

const MoreBtnStyled = styled.div`
  position: relative;
  font-weight: 700;
  letter-spacing: 1px;
  text-align: center;
  border-radius: 3px;

  .more-btn {
    width: 32px;
    height: 32px;
    color: #6b778c;
  }

  &:hover {
    background: #dadbe2;
  }
`;

const ListActionStyled = styled.div`
  position: absolute;
  width: 300px;
  min-height: 150px;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  z-index: 100;
  top: 36px;

  .action-heading {
    font-size: 14px;
    font-weight: 400;
    padding: 8px 0;
    border-bottom: 1px solid #ebecf0;
  }

  .action-item {
    font-size: 14px;
    font-weight: 400;
    text-align: left;
    padding: 10px 0 10px 20px;
    color: #42526e;
  }

  .action-item:hover {
    background: #ebecf0;
  }
`;

const MoreBtn = ({ columnId, handleDeleteColumn }) => {
  const [displayAction, setDisplayAction] = useState(false);

  const handleDisplayAction = (e) => {
    setDisplayAction(!displayAction);

    window.addEventListener("click", (e) => {
      if (
        e.target.dataset.columnid !== columnId &&
        !e.target.matches(".action-item")
      ) {
        setDisplayAction(false);
      }
    });
  };

  const handleDefault = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const deleteColumn = () => {
    handleDeleteColumn();
    setDisplayAction(false);
  };

  return (
    <MoreBtnStyled>
      <div
        className="more-btn"
        onClick={handleDisplayAction}
        data-columnid={columnId}
      >
        ...
      </div>

      {displayAction && (
        <ListActionStyled data-columnid={columnId}>
          <p className="action-heading">List actions</p>

          <p className="action-item" onMouseDown={handleDefault}>
            Add card...
          </p>
          <p className="action-item" onMouseDown={handleDefault}>
            Copy list...
          </p>
          <p
            className="action-item"
            onMouseDown={handleDefault}
            onClick={deleteColumn}
          >
            Remove list...
          </p>
          <p className="action-item" onMouseDown={handleDefault}>
            Watch
          </p>
        </ListActionStyled>
      )}
    </MoreBtnStyled>
  );
};

export default MoreBtn;
