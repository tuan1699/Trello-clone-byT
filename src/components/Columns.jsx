import React, { memo, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import TitleEditable from "./TitleEditable";
import MoreBtn from "./MoreBtn";
import AddCardField from "./AddCardField";
import { updateTitle, createNewCard, deleteColumn } from "../actions/callApi";
import { Controller } from "./Controller";
import Select from "./Select";
import Tooltip from "./Tooltip";
import ToggleTooltip from "./ToggleTooltip";

const ColumnsStyled = styled.div`
  flex: 0 0 auto;
  width: 272px;
  background: #ebecf0;
  border-radius: 3px;
  padding-left: 8px;
  margin-bottom: 20px;
  margin-right: 5px;
  margin-left: 5px;
  .list-task {
    min-height: 70px;
    max-height: 550px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 8px;
      border: solid 3px transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: #bfc4ce;
      border-radius: 5px;
    }
  }
  .drop-preview {
    background: #e2e4ea;
    margin-bottom: 8px;
  }
  .card-ghost {
    transition: transform 0.18s ease;
    transform: rotateZ(5deg);
    font-weight: 400;
    color: #223555;
  }
  .card-ghost-drop {
    transition: transform 0.18s ease-in-out;
    transform: rotateZ(0deg);
  }
`;
const ColumnHeadingStyled = styled.div`
  display: flex;
  height: 40px;
  justify-content: space-between;
  padding: 10px 6px;
  align-items: center;
  cursor: pointer;
`;
const ColumnFooterStyled = styled.div`
  height: 38px;
  .add-task {
    font-size: 14px;
    color: #5e6c84;
    padding: 6px;
    margin-right: 12px;
    border-radius: 3px;
    transition: all ease 0.2s;
    &:hover {
      cursor: pointer;
      background: #dadbe2;
      transition: all ease 0.2s;
    }
  }
`;

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
    cursor: pointer;
  }
`;
const Columns = memo(function Columns({
  column,
  onDragStart,
  onDragEnter,
  onDragEnd,
  boardId,
  updateColumns,
  columnIndex,
  onCardDragStart,
  handleCardOver,
  handleDragEndCard,
}) {
  const [cards, setCards] = useState([]);
  const [isDropColumn, setIsDropColumn] = useState(false);
  const titleRef = useRef(null);
  const [title, setTitle] = useState("");
  const cardRefInput = useRef(null);
  const [displayAddCard, setDisplayAddCard] = useState(false);
  const [cardTitle, setCardTitle] = useState("");
  const handleInputCard = (e) => {
    setCardTitle(e.target.value);
  };

  useEffect(() => {
    if (column) {
      column.cards.sort((a, b) => {
        return column.cardOrder.indexOf(a.id) - column.cardOrder.indexOf(b.id);
      });
      setCards(column.cards);
      setTitle(column.title);
    }
  }, [column]);

  // Add Card
  const handleAddCard = (newCardTitle) => {
    if (newCardTitle !== "") {
      const newCardToAdd = {
        boardId: boardId,
        columnId: column._id,
        title: newCardTitle.trim(),
      };
      createNewCard(newCardToAdd)
        .then((card) => {
          let newColumn = JSON.parse(JSON.stringify(column));
          newColumn.cards.push(card);
          newColumn.cardOrder.push(card._id);
          setCards(newColumn.cards);
        })
        .catch((err) => console.log(err));

      setCardTitle("");
      cardRefInput.current.focus();
    } else {
      cardRefInput.current.focus();
    }
  };

  const handleSaveTitleChange = (newTitle) => {
    if (newTitle.trim() === "") {
    } else if (newTitle.trim() === column.title.trim()) {
      return;
    } else {
      const newColumn = {
        ...column,
        title: newTitle,
      };
      updateTitle(column._id, newColumn);
    }
  };

  const handleToggleDisplay = () => {
    setDisplayAddCard(!displayAddCard);
    window.addEventListener("click", (e) => {
      if (
        e.target.dataset.idcolumn !== column._id || // column
        (!e.target.matches(".add-task") &&
          !e.target.matches("#input-card") &&
          !e.target.matches(".add-btn"))
      ) {
        setDisplayAddCard(false);
      }
    });
  };

  const handleClose = () => setDisplayAddCard(false);

  const handleDeleteColumn = () => {
    const confirmDelete = window.confirm("Do you want delete entire columns?");
    if (confirmDelete) {
      const newColumn = { ...column, _destroy: true }; // column
      console.log(newColumn);
      deleteColumn(newColumn._id, newColumn).then((updatedColumn) => {
        updateColumns(updatedColumn);
      });
    }
  };

  return (
    <>
      <ColumnsStyled
        className="column"
        data-idcolumn={column._id}
        onDragOver={(e) => e.preventDefault()}
      >
        <ColumnHeadingStyled
          draggable="true"
          onDragStart={(e) => {
            setIsDropColumn(true);
            return onDragStart(e, columnIndex);
          }}
          onDragEnter={(e) => {
            return onDragEnter(e, columnIndex);
          }}
          onDragEnd={(e) => {
            if (isDropColumn) return onDragEnd(e);
            setIsDropColumn(false);
          }}
          data-indexcolumn={columnIndex}
        >
          <TitleEditable
            title={title}
            handleSaveTitleChange={handleSaveTitleChange}
            titleRef={titleRef}
            data-indexcolumn={columnIndex}
            data-idcolumn={column._id}
            columnIndex={columnIndex}
            columnId={column._id}
          />
          <Controller>
            <Select>
              <MoreBtnStyled>
                <div
                  className="more-btn"
                  data-columnid={column._id}
                  data-indexcolumn={columnIndex}
                >
                  ...
                </div>
              </MoreBtnStyled>
            </Select>
            <Tooltip handleDeleteColumn={handleDeleteColumn} />
          </Controller>
        </ColumnHeadingStyled>

        <div
          className="list-task"
          data-indexcolumn={columnIndex}
          data-idcolumn={column._id}
        >
          {cards.map((card, index) => (
            <Card
              title={card.title}
              key={index}
              card={card}
              columnId={column._id}
              columnIndex={columnIndex}
              cardIndex={index}
              onCardDragStart={onCardDragStart}
              handleDragEndCard={handleDragEndCard}
              handleCardOver={handleCardOver}
            />
          ))}

          {displayAddCard && (
            <AddCardField
              handleClose={handleClose}
              onChange={handleInputCard}
              cardTitle={cardTitle}
              handleAddCard={handleAddCard}
              cardRefInput={cardRefInput}
              columnId={column._id}
              columnIndex={columnIndex}
            />
          )}
        </div>
        {displayAddCard || (
          <ColumnFooterStyled onClick={handleToggleDisplay}>
            <div
              className="add-task"
              data-idcolumn={column._id}
              data-indexcolumn={columnIndex}
            >
              {" "}
              <i className="fa-solid fa-plus"></i> Add a card
            </div>
          </ColumnFooterStyled>
        )}
      </ColumnsStyled>
    </>
  );
});
export default Columns;
