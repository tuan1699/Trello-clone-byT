import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import TitleEditable from "./TitleEditable";
import MoreBtn from "./MoreBtn";
import AddCardField from "./AddCardField";
import { updateTitle, createNewCard, deleteColumn } from "../actions/callApi";

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

const Columns = function Columns({
  column,
  onDragStart,
  onDragEnter,
  onDragEnd,
  boardId,
  updateColumns,
  columnIndex,
  // onCardDragStart,
  // handleDropCard,
  // handleCardOver,
  handleMouseUpCard,
  // handleDragEndCard,
  testDragEnd,
}) {
  const [cards, setCards] = useState([]);
  const [isDropCard, setIsDropCard] = useState(false);
  const [dragPayload, setDragPayload] = useState({});

  // STATE update title
  const titleRef = useRef(null);
  const [title, setTitle] = useState("");
  const cardDragOver = useRef();

  // STATE focus input card
  const cardRefInput = useRef(null);

  // STATE display
  const [displayAddCard, setDisplayAddCard] = useState(false);

  // STATE add card
  const [cardTitle, setCardTitle] = useState("");
  const handleInputCard = (e) => {
    setCardTitle(e.target.value);
  };
  // ------------------------------------------------------------------

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
        columnId: column._id, // column
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
      setTitle(column.title); // column
    } else if (newTitle.trim() === column.title.trim()) {
      // column
      return;
    } else {
      const newColumn = {
        ...column, // column
        title: newTitle,
      };
      updateTitle(column._id, newColumn); // column
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

  // ________________________________________________________________________________

  const handleDragStartCardTest = (e, card, columnIndex, cardIndex) => {
    setDragPayload({ card, columnIndex, cardIndex });
    setIsDropCard(true);
    let cardEl = e.target;
    if (cardEl.matches(".card")) {
      let cardPreview = cardEl.cloneNode(true);
      cardPreview.classList.add("card-preview");
      document.body.appendChild(cardPreview);
      cardEl.classList.add("card-ghost");
      let div = document.createElement("div");
      e.dataTransfer.setDragImage(div, 0, 0);
    }
  };

  const handleCardOverTest = (e, cardIndex, columnIndex) => {
    cardDragOver.current = cardIndex;
    if (isDropCard) {
      const cardPreview = document.querySelector(".card-preview");
      function moveAt(pageX, pageY) {
        cardPreview.style.left = pageX - cardPreview.offsetWidth / 2 + "px";
        cardPreview.style.top = pageY - 20 + "px";
      }
      function onMouseMove(e) {
        moveAt(e.pageX, e.pageY);
      }
      document.addEventListener("drag", onMouseMove);
    }
  };

  const handleDropCardTest = (e, dropIndex) => {
    const { card, columnIndex, cardIndex } = dragPayload;

    const eleBelow = document.elementFromPoint(e.clientX, e.clientY);
    const indexColumnDrop = Number(eleBelow.dataset.indexcolumn);

    const cardPreview = document.querySelector(".card-preview");
    const cardGhost = document.querySelector(".card-ghost");
    if (cardPreview && cardGhost) {
      cardGhost.classList.remove("card-ghost");
      cardPreview.remove();
      e.preventDefault();
    }

    if (isDropCard) {
      if (indexColumnDrop) {
        if (dragPayload) {
          if (indexColumnDrop !== columnIndex) {
            // const newColumns = [...columns];
            // newColumns[columnIndex].cards.splice(cardIndex, 1);
            // newColumns[dropColumnIndex].cards.splice(
            //   cardDragOver.current + 1,
            //   0,
            //   card
            // );
            // setColumns(newColumns);
            console.log("Khác column");
          } else {
            console.log("cùng column");

            if (cardDragOver.current !== cardIndex) {
              const newCards = [...cards];

              let relatedCard = newCards[cardDragOver.current];
              newCards.splice(cardIndex, 1, relatedCard);
              newCards.splice(cardDragOver.current, 1, card);
              setCards(newCards);
            } else {
              console.log("không thay đổi");
            }
          }
        }
      }
    }
    // setIsDropCard(false);
  };

  // Xử lý Drag n Drop Card

  return (
    <>
      <ColumnsStyled
        className="column"
        onDragOver={(e) => e.preventDefault()}
        // onDrop={(e) => handleDropCard(e, columnIndex)}
      >
        <ColumnHeadingStyled
          draggable="true"
          onDragStart={onDragStart}
          onDragEnter={onDragEnter}
          onDragEnd={onDragEnd}
          data-indexcolumn={columnIndex}
        >
          <TitleEditable
            title={title}
            handleSaveTitleChange={handleSaveTitleChange}
            titleRef={titleRef}
            data-indexcolumn={columnIndex}
            columnIndex={columnIndex}
          />
          <MoreBtn
            columnId={column._id} // column
            handleDeleteColumn={handleDeleteColumn}
            columnIndex={columnIndex}
          />
        </ColumnHeadingStyled>
        <div className="list-task" data-indexcolumn={columnIndex}>
          {cards.map((card, index) => (
            <Card
              title={card.title}
              key={index}
              card={card}
              columnId={column._id} // column
              columnIndex={columnIndex}
              cardIndex={index}
              handleMouseUpCard={handleMouseUpCard}
              testDragEnd={testDragEnd}
              // onCardDragStart={onCardDragStart}
              // handleDragEndCard={handleDragEndCard}
              // handleCardOver={handleCardOver}
              // handleDropCard={handleDropCard}
              handleDragStartCardTest={handleDragStartCardTest}
              handleCardOverTest={handleCardOverTest}
              handleDropCardTest={handleDropCardTest}
            />
          ))}

          {displayAddCard && (
            <AddCardField
              handleClose={handleClose}
              onChange={handleInputCard}
              cardTitle={cardTitle}
              handleAddCard={handleAddCard}
              cardRefInput={cardRefInput}
              columnId={column._id} // column
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
};

export default Columns;
