import React, { useEffect, useRef, useState, memo } from "react";
import styled from "styled-components";
import Card from "./Card";
import TitleEditable from "./TitleEditable";
import MoreBtn from "./MoreBtn";
import AddCardField from "./AddCardField";
import { updateTitle } from "../actions/callApi";
import { createNewCard } from "../actions/callApi";

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

const Columns = memo(function Columns({
  column,
  onDragStart,
  onDragEnter,
  onDragEnd,
  boardId,
}) {
  const [cards, setCards] = useState([]);

  // STATE update title
  const titleRef = useRef(null);
  const [title, setTitle] = useState("");

  // STATE focus input card
  const cardRefInput = useRef(null);

  // STATE display
  const [displayAddCard, setDisplayAddCard] = useState(false);

  // STATE drag n drop
  const [columnStart, setColumnStart] = useState("");
  const [columnEnd, setColumnEnd] = useState("");

  // STATE add card
  const [cardTitle, setCardTitle] = useState("");
  const handleInputCard = (e) => {
    setCardTitle(e.target.value);
  };

  // Drag n Drop
  const dragCard = useRef(null);
  const dragOverCard = useRef(null);

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
  const handleAddCard = () => {
    if (cardTitle !== "") {
      const newCardToAdd = {
        boardId: boardId,
        columnId: column._id,
        title: cardTitle.trim(),
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

  // Handle change title
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleSaveTitleChange = () => {
    if (title.trim() === "") {
      setTitle(column.title);
    } else {
      const newColumn = {
        ...column,
        title: title,
      };
      updateTitle(column._id, newColumn);
    }
  };
  const handleToggleDisplay = () => {
    setDisplayAddCard(!displayAddCard);
    window.addEventListener("click", (e) => {
      if (
        e.target.dataset.idcolumn !== column._id ||
        (!e.target.matches(".add-task") &&
          !e.target.matches("#input-card") &&
          !e.target.matches(".add-btn"))
      ) {
        setDisplayAddCard(false);
      }
    });
  };
  const handleClose = () => setDisplayAddCard(false);

  // Xử lý Drag n Drop
  const dragCardStart = (e, position, columnId) => {
    dragCard.current = position;
    setColumnStart(columnId);
    console.log(columnStart);
  };

  const dragCardEnter = (e, position, columnId) => {
    dragOverCard.current = position;
    setColumnEnd(columnId);
    console.log(columnEnd);
  };

  const dropCard = () => {
    console.log("start", columnStart);
    console.log("end", columnEnd);
    console.log("index", dragCard.current);
    console.log("indexBehind", dragOverCard.current);
  };

  return (
    <>
      <ColumnsStyled>
        <ColumnHeadingStyled
          draggable="true"
          onDragStart={onDragStart}
          onDragEnter={onDragEnter}
          onDragEnd={onDragEnd}
        >
          <TitleEditable
            title={title}
            onChange={handleChangeTitle}
            onBlur={handleSaveTitleChange}
            titleRef={titleRef}
          />
          <MoreBtn columnId={column._id} />
        </ColumnHeadingStyled>
        <div className="list-task">
          {cards.map((card, index) => (
            <Card
              title={card.title}
              key={index}
              columnId={column._id}
              onDragStart={(e) => dragCardStart(e, index, card.columnId)}
              onDragEnter={(e) => dragCardEnter(e, index, card.columnId)}
              onDragEnd={dropCard}
            />
          ))}

          {displayAddCard && (
            <AddCardField
              handleClose={handleClose}
              onChange={handleInputCard}
              cardTitle={cardTitle}
              onClick={handleAddCard}
              cardRefInput={cardRefInput}
              columnId={column._id}
            />
          )}
        </div>

        {displayAddCard || (
          <ColumnFooterStyled onClick={handleToggleDisplay}>
            <div className="add-task" data-idcolumn={column._id}>
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
