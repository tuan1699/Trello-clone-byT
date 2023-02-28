import React, { useEffect, useState } from "react";
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

const TitleEditable = ({
  title,
  handleSaveTitleChange,
  titleRef,
  columnIndex,
}) => {
  const handleSelectAllTitle = () => {
    titleRef.current.focus();
    titleRef.current.select();
  };

  const [titleColumn, setTitleColumn] = useState("");

  useEffect(() => {
    setTitleColumn(title);
  }, [title]);

  // Handle change title
  const handleChangeTitle = (e) => {
    setTitleColumn(e.target.value);
  };

  return (
    <TitleEditableStyled>
      <input
        type="text"
        value={titleColumn}
        className="title-editable"
        onDoubleClick={handleSelectAllTitle}
        ref={titleRef}
        draggable="true"
        onChange={handleChangeTitle}
        onBlur={() => handleSaveTitleChange(titleColumn)}
        data-indexcolumn={columnIndex}
      />
    </TitleEditableStyled>
  );
};

export default TitleEditable;
