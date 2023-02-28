import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { fetchBoard } from "../actions/callApi";
import { createNewColumn, updateBoard } from "../actions/callApi";

// import component
import Columns from "./Columns";
import AddField from "./AddField";

const BoardBg = styled.div`
  background: #d29034;
  height: calc(100vh - 90px);

  #board {
    display: flex;
    flex: 0 0 auto;
    padding: 0px 12px;
    height: calc(100vh - 90px - 10px);
    overflow-x: auto;
    align-items: flex-start;

    ::-webkit-scrollbar {
      height: 12px;
      width: 112px;
    }

    ::-webkit-scrollbar:vertical {
      width: 12px;
      margin-bottom: 20px;
    }

    ::-webkit-scrollbar-track {
      background: #b37b2c;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background: #d1af81;
      border-radius: 10px;
    }
  }

  .board-content {
    display: flex;
    width: 100%;
    gap: 8px;
  }

  .cards-drop-preview {
    background: rgba(0, 0, 0, 0.2);
  }

  .add-column-field {
    margin-left: 5px;
  }
`;

const Board = () => {
  const boardId = "63f5926aebd6fc01fc46e1b8";
  const [columns, setColumns] = useState([]);
  const [board, setBoard] = useState({});
  const [isDropColumn, setIsDropColumn] = useState(false);
  // const [isDropCard, setIsDropCard] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const addTitleRef = useRef(null);
  const handleInputNewTitle = (e) => {
    setNewTitle(e.target.value);
  };

  const handleAddColumn = (title) => {
    const newColumnToAdd = {
      boardId: boardId,
      title: title.trim(),
    };
    createNewColumn(newColumnToAdd).then((column) => {
      const newColumns = [...columns];
      newColumns.push(column);
      let newBoard = { ...board };
      newBoard.columnOrder = newColumns.map((column) => column._id);
      newBoard.columns = newColumns;
      setColumns(newColumns);
      setBoard(newBoard);
      addTitleRef.current.focus();
    });
  };

  const updateColumns = (updatedColumn) => {
    const updatedColumnId = updatedColumn._id;
    let newColumns = [...columns];
    let updatedColumnIndex = newColumns.findIndex(
      (column) => column._id === updatedColumnId
    );
    if (updatedColumn._destroy) {
      newColumns.splice(updatedColumnIndex, 1);
    }
    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((column) => column._id);
    newBoard.columns = newColumns;
    setBoard(newBoard);
    setColumns(newColumns);
  };

  // Drop n Drag Column
  const dragItem = useRef();
  const dragOverItem = useRef();
  // const cardDragOver = useRef();

  // Lấy data
  useEffect(() => {
    fetchBoard(boardId).then((board) => {
      const columnsDb = board.columns;
      columnsDb.sort((a, b) => {
        return (
          board.columnOrder.indexOf(a._id) - board.columnOrder.indexOf(b._id)
        );
      });
      setBoard(board);
      setColumns(columnsDb);
    });
  }, []);

  // Xử lý Drag n Drop
  const dragStart = (e, position) => {
    setIsDropColumn(true);
    dragItem.current = position;

    // animation
    let column = e.target.parentElement;
    while (!column.matches(".column")) {
      column = column.parentElement;
    }
    let columnPreview = column.cloneNode(true);
    columnPreview.classList.add("card-preview");
    document.body.appendChild(columnPreview);
    column.classList.add("shadow");
    let div = document.createElement("div");
    e.dataTransfer.setDragImage(div, 0, 0);
  };

  const dragEnter = (e, position) => {
    if (isDropColumn) {
      dragOverItem.current = position;
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

  const drop = (e) => {
    if (isDropColumn) {
      setIsDropColumn(false);
      const copyColums = [...columns];
      const copyBoard = { ...board };
      const dragColumn = copyColums[dragItem.current];
      const dragOverColumn = copyColums[dragOverItem.current];
      if (dragColumn && dragOverColumn) {
        if (
          (dragItem.current === 0 &&
            dragOverItem.current === copyBoard.columnOrder.length - 1) ||
          (dragItem.current === copyBoard.columnOrder.length - 1 &&
            dragOverItem.current === 0)
        ) {
          copyBoard.columnOrder.splice(dragItem.current, 1, dragOverColumn._id);
          copyBoard.columnOrder.splice(dragOverItem.current, 1, dragColumn._id);
        } else {
          copyBoard.columnOrder.splice(dragItem.current, 1, dragOverColumn._id);
          copyBoard.columnOrder.splice(dragOverItem.current, 1, dragColumn._id);
        }
      }
      copyColums.sort((a, b) => {
        return (
          copyBoard.columnOrder.indexOf(a._id) -
          copyBoard.columnOrder.indexOf(b._id)
        );
      });
      dragItem.current = null;
      dragOverItem.current = null;
      setColumns(copyColums);
      copyBoard.columnOrder = copyColums.map((column) => column._id);
      setBoard(copyBoard);
      updateBoard(copyBoard._id, copyBoard).catch((error) => {
        console.log(error);
        setColumns(columns);
        setBoard(board);
      });
      const cardPreview = document.querySelector(".card-preview");
      const shadow = document.querySelector(".shadow");
      shadow.classList.remove("shadow");
      if (cardPreview) {
        cardPreview.remove();
      }
    }
  };

  // const onCardDragStart = (e, card, columnIndex, cardIndex) => {
  //   console.log(card);
  //   setDragPayload({ card, columnIndex, cardIndex });
  //   e.dataTransfer.setData(
  //     "card",
  //     JSON.stringify({ card, columnIndex, cardIndex })
  //   );
  //   // setDragPayload({ card, columnIndex, cardIndex });
  //   setIsDropCard(true);
  //   let cardEl = e.target;
  //   if (cardEl.matches(".card")) {
  //     let cardPreview = cardEl.cloneNode(true);
  //     cardPreview.classList.add("card-preview");
  //     document.body.appendChild(cardPreview);
  //     cardEl.classList.add("card-ghost");
  //     let div = document.createElement("div");
  //     e.dataTransfer.setDragImage(div, 0, 0);
  //   }
  // };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // const handleCardOver = (e, cardIndex, columnIndex) => {
  //   cardDragOver.current = cardIndex;
  //   if (isDropCard) {
  //     const cardPreview = document.querySelector(".card-preview");
  //     function moveAt(pageX, pageY) {
  //       cardPreview.style.left = pageX - cardPreview.offsetWidth / 2 + "px";
  //       cardPreview.style.top = pageY - 20 + "px";
  //     }
  //     function onMouseMove(e) {
  //       moveAt(e.pageX, e.pageY);
  //     }
  //     document.addEventListener("drag", onMouseMove);
  //   }
  // };

  // const handleDropCard = (e, dropColumnIndex) => {
  //   console.log(e.clientX - e.target.getBoundingClientRect().left);
  //   console.log(e.clientY - e.target.getBoundingClientRect().top);

  //   // console.log(document.elementFromPoint(e.clientX, e.clientY));

  //   if (isDropCard) {
  //     const cardPreview = document.querySelector(".card-preview");
  //     const cardGhost = document.querySelector(".card-ghost");
  //     if (cardPreview && cardGhost) {
  //       cardGhost.classList.remove("card-ghost");
  //       cardPreview.remove();
  //       e.preventDefault();
  //       const dragData = JSON.parse(e.dataTransfer.getData("card")) || null;
  //       if (dragPayload) {
  //         const { card, columnIndex, cardIndex } = dragData;

  //         if (dropColumnIndex !== columnIndex) {
  //           const newColumns = [...columns];
  //           newColumns[columnIndex].cards.splice(cardIndex, 1);
  //           newColumns[dropColumnIndex].cards.splice(
  //             cardDragOver.current + 1,
  //             0,
  //             card
  //           );
  //           setColumns(newColumns);
  //         } else {
  //           if (cardDragOver.current !== cardIndex) {
  //             let newColumns = cloneDeep(columns);
  //             let relatedCard =
  //               newColumns[columnIndex].cards[cardDragOver.current];
  //             newColumns[columnIndex].cards.splice(cardIndex, 1, relatedCard);
  //             newColumns[columnIndex].cards.splice(
  //               cardDragOver.current,
  //               1,
  //               card
  //             );
  //             setColumns(newColumns);
  //           }
  //         }
  //       }
  //     }
  //   }
  // };

  if (!columns) {
    return <div>Không lấy được dữ liệu</div>;
  } else {
    return (
      <BoardBg>
        <div id="board">
          {columns.map((column, index) => (
            <Columns
              column={column}
              key={index}
              onDragStart={(e) => dragStart(e, index)}
              onDragEnter={(e) => dragEnter(e, index)}
              onDragEnd={drop}
              boardId={boardId}
              updateColumns={updateColumns}
              columnIndex={index}
              // onCardDragStart={onCardDragStart}
              onDragOver={handleDragOver}
              // handleDropCard={handleDropCard}
              // handleCardOver={handleCardOver}
              // handleDragEndCard={handleDragEndCard}
            />
          ))}
          <div className="add-column-field">
            <AddField
              newTitle={newTitle}
              onChange={handleInputNewTitle}
              handleAddColumn={handleAddColumn}
              addTitleRef={addTitleRef}
            />
          </div>
        </div>
      </BoardBg>
    );
  }
};

export default Board;
