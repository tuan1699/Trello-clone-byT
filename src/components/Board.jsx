import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { fetchBoard } from "../actions/callApi";
import { createNewColumn } from "../actions/callApi";
// import component
import Columns from "./Columns";
import AddField from "./AddField";

const BoardBg = styled.div`
  background: #d29034;
  height: calc(100vh - 90px);

  .board {
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

  // Drop n Drag Column
  const dragItem = useRef();
  const dragOverItem = useRef();

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
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const drop = (e) => {
    const copyColums = [...columns];
    const dragColumn = copyColums[dragItem.current];
    const dragOverColumn = copyColums[dragOverItem.current];
    if (
      (dragItem.current === 0 &&
        dragOverItem.current === board.columnOrder.length - 1) ||
      (dragItem.current === board.columnOrder.length - 1 &&
        dragOverItem.current === 0)
    ) {
      board.columnOrder.splice(dragItem.current, 1, dragOverColumn._id);
      board.columnOrder.splice(dragOverItem.current, 1, dragColumn._id);
    } else {
      board.columnOrder.splice(dragItem.current, 1, dragOverColumn._id);
      board.columnOrder.splice(dragOverItem.current, 1, dragColumn._id);
    }

    copyColums.sort((a, b) => {
      return (
        board.columnOrder.indexOf(a._id) - board.columnOrder.indexOf(b._id)
      );
    });
    dragItem.current = null;
    dragOverItem.current = null;
    setColumns(copyColums);
  };

  if (!columns) {
    return <div>Không lấy được dữ liệu</div>;
  } else {
    return (
      <BoardBg>
        <div className="board">
          {columns.map((column, index) => (
            <Columns
              column={column}
              key={index}
              onDragStart={(e) => dragStart(e, index)}
              onDragEnter={(e) => dragEnter(e, index)}
              onDragEnd={drop}
              boardId={boardId}
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
