import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { fetchBoard } from "../actions/callApi";
import {
  createNewColumn,
  updateBoard,
  updateCardInColumn,
} from "../actions/callApi";

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
  const [cards, setCards] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const addTitleRef = useRef(null);
  // const [impactedColumn, setImpactedColumn] = useState(null);
  // Drop n Drag Column
  const dragItem = useRef();
  const dragOverItem = useRef();
  const cardDragOver = useRef(null);
  const columnIdDragCard = useRef(null);
  const columnIdDropCard = useRef(null);

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

  // Lấy data
  useEffect(() => {
    fetchBoard(boardId).then((board) => {
      const columnsDb = board.columns;
      columnsDb.sort((a, b) => {
        return (
          board.columnOrder.indexOf(a._id) - board.columnOrder.indexOf(b._id)
        );
      });
      setCards(cards);
      setBoard(board);
      setColumns(columnsDb);
    });
  }, []);

  // Xử lý Drag n Drop
  const dragStart = (e, position) => {
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
  };

  const drop = useCallback(
    (e) => {
      const copyColums = [...columns];
      const copyBoard = { ...board };
      const dragColumn = copyColums[dragItem.current];
      const dragOverColumn = copyColums[dragOverItem.current];
      if (dragOverColumn && dragColumn && dragColumn !== dragOverColumn) {
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
        copyColums.sort((a, b) => {
          return (
            copyBoard.columnOrder.indexOf(a._id) -
            copyBoard.columnOrder.indexOf(b._id)
          );
        });
        setColumns(copyColums);
        copyBoard.columnOrder = copyColums.map((column) => column._id);
        setBoard(copyBoard);
        updateBoard(copyBoard._id, copyBoard).catch((error) => {
          console.log(error);
          setColumns(columns);
          setBoard(board);
        });
      }
      dragItem.current = null;
      dragOverItem.current = null;
      const cardPreview = document.querySelector(".card-preview");
      const shadow = document.querySelector(".shadow");
      shadow.classList.remove("shadow");
      if (cardPreview) {
        cardPreview.remove();
      }
    },
    [board, columns]
  );

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const onCardDragStart = (e, card, columnIndex, cardIndex, columnId) => {
    columnIdDragCard.current = columnId;
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

  const handleCardOver = (e, cardIndex, columnId) => {
    cardDragOver.current = cardIndex;
    columnIdDropCard.current = columnId;
    let dynamicGhost = document.createElement("div");
    dynamicGhost.style.width = "256px";
    dynamicGhost.style.height = "30px";
    dynamicGhost.classList.add("dynamic-ghost");
    const cardPreview = document.querySelector(".card-preview");
    function moveAt(pageX, pageY) {
      cardPreview.style.left = pageX - cardPreview.offsetWidth / 2 + "px";
      cardPreview.style.top = pageY - 20 + "px";
    }
    function onMouseMove(e) {
      moveAt(e.pageX, e.pageY);
      const eleBelow = document.elementFromPoint(e.clientX, e.clientY);
      let cardEl;
      if (eleBelow.matches(".card")) {
        cardEl = eleBelow;
      }
      if (cardEl) {
        const shiftY = e.clientY - cardEl.getBoundingClientRect().top;
        const heightEl = cardEl.offsetHeight;
        if (shiftY > heightEl / 2) {
          if (
            !cardEl.nextElementSibling ||
            !cardEl.nextElementSibling.matches(".dynamic-ghost")
          ) {
            cardEl.insertAdjacentElement("afterend", dynamicGhost);
          }
        } else if (shiftY < heightEl / 2 || shiftY === heightEl / 2) {
          if (
            !cardEl.previousElementSibling ||
            !cardEl.previousElementSibling.matches(".dynamic-ghost")
          ) {
            cardEl.insertAdjacentElement("beforebegin", dynamicGhost);
          }
        }
      }
    }
    document.addEventListener("drag", onMouseMove);

    dynamicGhost.remove();
  };

  const handleDragEndCard = (e, card, columnIndex, cardIndex) => {
    const cardPreview = document.querySelector(".card-preview");
    const cardGhost = document.querySelector(".card-ghost");
    const dynamicGhost = document.querySelector(".dynamic-ghost");
    if (cardPreview && cardGhost && dynamicGhost) {
      cardGhost.classList.remove("card-ghost");
      cardPreview.remove();
      dynamicGhost.remove();
      e.preventDefault();
    }
    const eleBelow = document.elementFromPoint(e.clientX, e.clientY);
    const indexColumnDrop = Number(eleBelow.dataset.indexcolumn);

    let cardEl;
    if (eleBelow.matches(".card")) {
      cardEl = eleBelow;
    }
    if (!isNaN(indexColumnDrop)) {
      if (indexColumnDrop !== columnIndex) {
        const newColumns = [...columns];
        newColumns[columnIndex].cards.splice(
          newColumns[columnIndex].cards.indexOf(card),
          1
        );
        if (cardEl) {
          const shiftY = e.clientY - cardEl.getBoundingClientRect().top;
          const heightEl = cardEl.offsetHeight;
          if (shiftY > heightEl / 2) {
            console.log("Thêm vào sau");
            newColumns[indexColumnDrop].cards.splice(
              cardDragOver.current + 1,
              0,
              card
            );
          } else {
            newColumns[indexColumnDrop].cards.splice(
              cardDragOver.current,
              0,
              card
            );
          }
        } else {
          newColumns[indexColumnDrop].cards.push(card);
        }
        newColumns[columnIndex].cardOrder = newColumns[columnIndex].cards.map(
          (card) => card._id
        );
        // updateCardInColumn(
        //   newColumns[columnIndex]._id,
        //   newColumns[columnIndex]
        // ).catch((err) => {
        //   setColumns(columns);
        // });
        // newColumns[indexColumnDrop].cardOrder = newColumns[
        //   indexColumnDrop
        // ].cards.map((card) => card._id);
        // updateCardInColumn(
        //   newColumns[indexColumnDrop]._id,
        //   newColumns[indexColumnDrop]
        // ).catch((err) => {
        //   setColumns(columns);
        // });

        setColumns(newColumns);
      } else {
        console.log("cùng cột");
        let newColumns = [...columns];
        if (cardDragOver.current !== cardIndex) {
          if (cardEl) {
            const shiftY = e.clientY - cardEl.getBoundingClientRect().top;
            const heightEl = cardEl.offsetHeight;
            if (shiftY > heightEl / 2) {
              console.log("Thêm vào sau");
              newColumns[columnIndex].cards.splice(cardIndex, 1);
              newColumns[columnIndex].cards.splice(
                cardDragOver.current + 1,
                0,
                card
              );
            } else if (shiftY < heightEl / 2 || shiftY === heightEl / 2) {
              console.log("Thêm vào trước");
              newColumns[columnIndex].cards.splice(cardIndex, 1);
              newColumns[columnIndex].cards.splice(
                cardDragOver.current,
                0,
                card
              );
            }
          } else {
            newColumns[columnIndex].cards.splice(cardIndex, 1);
            newColumns[columnIndex].cards.splice(
              cardDragOver.current + 1,
              0,
              card
            );
          }

          setColumns(newColumns);
        } else {
          console.log("không thay đổi");
        }
      }
    }
    cardDragOver.current = null;
  };

  if (!columns) {
    return <div>Không lấy được dữ liệu</div>;
  } else {
    return (
      <BoardBg>
        <div id="board">
          {columns.map((column, index) => (
            <Columns
              board={board}
              column={column}
              columnIndex={index}
              boardId={boardId}
              allCards={cards}
              key={index}
              onDragStart={(e) => dragStart(e, index)}
              onDragEnter={(e) => dragEnter(e, index)}
              onDragEnd={drop}
              updateColumns={updateColumns}
              onDragOver={handleDragOver}
              onCardDragStart={onCardDragStart}
              handleCardOver={handleCardOver}
              handleDragEndCard={handleDragEndCard}
              // impactedColumn={impactedColumn}
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
