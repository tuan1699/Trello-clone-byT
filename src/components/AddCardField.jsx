import React from "react";
import styled from "styled-components";

const AddCardFieldStyled = styled.div`
  background: #ebecf0;
  border-radius: 3px;
  margin-bottom: 10px;

  .area-editable {
    padding: 6px 8px;
    min-width: 256px;
    max-width: 256px;
    min-height: 50px;
    max-height: 100px;
    border-radius: 3px;
    border: 2.5px solid transparent;
    font-size: 14px;
    border: none;
    outline: none;
    color: #6b778c;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 1.5px 2px 0px;
  }

  .area-editable:focus {
    border: none;
    outline: none;
  }

  .feature {
    display: flex;
    align-items: center;
  }

  .add-btn {
    padding: 8px 12px;
    background: #0079bf;
    outline: none;
    color: #f2f7fb;
    border: none;
    border-radius: 3px;
    margin-top: 5px;
    font-size: 14px;
  }

  .add-btn:hover {
    background: #026aa7;
    cursor: pointer;
  }

  .close-btn {
    margin-left: 10px;
    font-size: 20px;
    color: #42526e;
  }

  .close-btn:hover {
    cursor: pointer;
    color: #000;
  }
`;

const AddCardField = ({
  handleClose,
  onChange,
  cardTitle,
  onClick,
  cardRefInput,
  columnId,
}) => {
  return (
    <>
      <AddCardFieldStyled>
        <textarea
          id="input-card"
          type="text"
          placeholder="Enter list title..."
          className="area-editable"
          cols="10"
          rows="5"
          autoFocus
          onChange={onChange}
          value={cardTitle}
          ref={cardRefInput}
          data-idcolumn={columnId}
        />
        <div className="feature">
          <button
            className="add-btn"
            onClick={onClick}
            data-idcolumn={columnId}
          >
            Add card
          </button>
          <i className="fa-solid fa-xmark close-btn" onClick={handleClose}></i>
        </div>
      </AddCardFieldStyled>
    </>
  );
};

export default AddCardField;
