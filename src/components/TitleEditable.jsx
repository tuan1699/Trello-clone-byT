import React from "react";
import styled from "styled-components";

const TitleEditableStyled = styled.div`
  .title-editable {
    font-size: 14px;
    color: #43536f;
    font-weight: 600;
    padding: 2px;
    border-radius: 3px;
    border: none;
    background: #ebecf0;
    cursor: pointer;
  }

  .title-editable:focus {
    border: 2px solid #0079bf;
    outline: none;
    background: #fff;
  }
`;

const TitleEditable = ({ title, onBlur, onChange, titleRef }) => {
  const handleSelectAllTitle = () => {
    titleRef.current.focus();
    titleRef.current.select();
  };

  return (
    <TitleEditableStyled>
      <input
        type="text"
        value={title}
        className="title-editable"
        // onMouseDown={(e) => e.preventDefault()}
        onDoubleClick={handleSelectAllTitle}
        ref={titleRef}
        draggable="true"
        onChange={onChange}
        onBlur={onBlur}
      />
    </TitleEditableStyled>
  );
};

export default TitleEditable;
