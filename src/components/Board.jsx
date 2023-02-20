import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container, Draggable } from "react-smooth-dnd";

// import function ulities
// import { sortOrder } from "../ulities/sort";
import { initData } from "../actions/initData"; // import data

// import component
import Columns from "./Columns";
import AddColumn from "./AddColumn";

const BoardBg = styled.div`
  background: #d29034;
  height: calc(100vh - 90px);
`;

const BoardStyled = styled.div`
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

  .board-content {
    display: flex;
    width: 100%;
    gap: 8px;
  }

  .cards-drop-preview {
    background: rgba(0, 0, 0, 0.2);
  }
`;

const Board = () => {
  const [columns, setColumns] = useState([]);

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

  const onColumnDrop = (dropResult) => {
    console.log(dropResult);
  };

  if (!columns) {
    return <div>Không lấy được dữ liệu</div>;
  } else {
    return (
      <BoardBg>
        <BoardStyled>
          <Container
            orientation="horizontal"
            onDrop={onColumnDrop}
            getChildPayload={(index) => console.log(columns[index])}
            dragHandleSelector=".column-drag-handle"
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
              className: "cards-drop-preview",
            }}
            className="board-content"
          >
            {columns.map((column, index) => (
              <Draggable key={index}>
                <Columns column={column} />
              </Draggable>
            ))}
          </Container>

          <AddColumn />
        </BoardStyled>
      </BoardBg>
    );
  }
};

export default Board;
