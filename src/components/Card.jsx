import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { updateCard } from "../actions/callApi";

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
  width: 256px;

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

  .edit-field {
    position: absolute;
    width: 256px;
    top: 0px;
    right: 0px;
    z-index: 100;
  }

  #input-edit {
    width: 100%;
    // min-height: 90px;
    padding: 8px 14px;
    border: none;
    outline: none;
    background: #fff;
    border-radius: 3px;
    margin-bottom: 4px;
  }

  .save-btn {
    padding: 8px 16px;
    background: #0079bf;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
`;

const ModalStyled = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #0009;
  opacity: 1;
  z-index: 10;
`;

const Card = ({
  title,
  card,
  columnIndex,
  // onCardDragStart,
  cardIndex,
  // handleDropCard,
  // handleCardOver,
  handleDragStartCardTest,
  handleCardOverTest,
  handleDropCardTest,
}) => {
  const [displayEdit, setDisplayEdit] = useState(false);
  const [inputChange, setInputChange] = useState("");
  const [titleCard, setTitleCard] = useState("");

  useEffect(() => {
    setInputChange(title);
    setTitleCard(title);
  }, [title]);

  const handleInputChange = (e) => {
    setInputChange(e.target.value);
  };

  const handleSave = () => {
    if (inputChange.trim() !== "") {
      setTitleCard(inputChange);
      const newCard = {
        ...card,
        title: inputChange,
      };
      updateCard(card._id, newCard);
      setDisplayEdit(false);
    } else {
      setTitleCard(title);
      setDisplayEdit(false);
    }
  };

  const handleDisplayEdit = (e) => {
    setDisplayEdit(true);

    window.addEventListener("click", (e) => {
      if (
        (e.target.matches(".edit-field") &&
          !e.target.matches(".edit-btn") &&
          !e.target.matches(".edit-icon")) ||
        e.target.matches(".modal-bg")
      ) {
        setDisplayEdit(false);
      }
    });
  };

  return (
    <>
      <CardStyled
        draggable="true"
        // onDragStart={(e) => onCardDragStart(e, card, columnIndex, cardIndex)}
        // onDragEnter={(e) => handleCardOver(e, cardIndex, columnIndex)}
        onDragEnd={(e) => handleDropCardTest(e, columnIndex)}
        onDragStart={(e) =>
          handleDragStartCardTest(e, card, columnIndex, cardIndex)
        }
        onDragEnter={(e) => handleCardOverTest(e, cardIndex, columnIndex)}
        className="card"
        data-indexcolumn={columnIndex}
      >
        {titleCard}
        <div className="edit-btn" onClick={handleDisplayEdit}>
          <i className="fa-solid fa-pencil edit-icon"></i>
        </div>
        {displayEdit && (
          <div className="edit-field">
            <input
              type="text"
              name=""
              id="input-edit"
              value={inputChange}
              autoFocus
              onChange={handleInputChange}
            />
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
          </div>
        )}
      </CardStyled>
      {displayEdit && <ModalStyled className="modal-bg"></ModalStyled>}
    </>
  );
};

export default Card;
