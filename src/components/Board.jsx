import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { initData } from "../actions/initData";

// import component
import Columns from "./Columns";
import AddToggleCol from "./AddToggleCol";
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
  const [columns, setColumns] = useState([]);

  // Drop n Drag Column
  const dragItem = useRef();
  const dragOverItem = useRef();

  // Lấy data
  useEffect(() => {
    if (initData) {
      const columnsDb = initData.columns;

      columnsDb.sort((a, b) => {
        return (
          initData.columnsOrder.indexOf(a.id) -
          initData.columnsOrder.indexOf(b.id)
        );
      });

      setColumns(columnsDb);
    }
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
        dragOverItem.current === initData.columnsOrder.length - 1) ||
      (dragItem.current === initData.columnsOrder.length - 1 &&
        dragOverItem.current === 0)
    ) {
      initData.columnsOrder.splice(dragItem.current, 1, dragOverColumn.id);
      initData.columnsOrder.splice(dragOverItem.current, 1, dragColumn.id);
    } else {
      initData.columnsOrder.splice(dragItem.current, 1, dragOverColumn.id);
      initData.columnsOrder.splice(dragOverItem.current, 1, dragColumn.id);
    }

    copyColums.sort((a, b) => {
      return (
        initData.columnsOrder.indexOf(a.id) -
        initData.columnsOrder.indexOf(b.id)
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
            />
          ))}

          <div className="add-column-field">
            <AddField />
          </div>
        </div>
      </BoardBg>
    );
  }
};

export default Board;
