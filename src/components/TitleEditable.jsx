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
  columnId,
}) => {
  const handleSelectAllTitle = () => {
    titleRef.current.focus();
    titleRef.current.select();
  };

  const [titleColumn, setTitleColumn] = useState("");
  const [isFocusTitle, setIsFocusTitle] = useState(false);

  useEffect(() => {
    setTitleColumn(title);
  }, [title]);

  // Handle change title
  const handleChangeTitle = (e) => {
    setTitleColumn(e.target.value);
  };

  return (
    <TitleEditableStyled
      onDoubleClick={() => {
        setIsFocusTitle(true);
        titleRef.current.focus();
        titleRef.current.select();
      }}
    >
      <input
        disabled={isFocusTitle ? false : true}
        type="text"
        value={titleColumn}
        className="title-editable"
        onDoubleClick={() => {
          setIsFocusTitle(true);
          handleSelectAllTitle();
        }}
        ref={titleRef}
        onChange={handleChangeTitle}
        onBlur={() => {
          setIsFocusTitle(false);
          handleSaveTitleChange(titleColumn);
        }}
        data-indexcolumn={columnIndex}
        data-idcolumn={columnId}
      />
    </TitleEditableStyled>
  );
};

export default TitleEditable;
