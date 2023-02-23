import React from "react";
import styled from "styled-components";

const CardStyled = styled.div`
  position: relative;
  padding: 6px 8px;
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1.5px 2px 0px;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 400;
  color: #6b778c;
  margin-bottom: 8px;
  cursor: pointer;

  &:hover {
    cursor: pointer;
  }

  &:hover .edit-btn {
    display: flex;
  }

  .edit-btn {
    position: absolute;
    top: 2px;
    right: 2px;
    width: 27px;
    height: 27px;
    background: #ebecf0;
    display: none;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
  }

  .edit-btn i {
    font-size: 12px;
  }

  .edit-btn i:hover .edit-btn {
    background: #ebecf0;
  }
`;

const Card = ({
  title,
  columnId,
  onDragStart,
  onDragEnter,
  onDragEnd,
  onDragLeave,
}) => {
  return (
    <CardStyled
      draggable="true"
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
    >
      {title}
      <div className="edit-btn">
        <i className="fa-solid fa-pencil"></i>
      </div>
    </CardStyled>
  );
};

export default Card;
