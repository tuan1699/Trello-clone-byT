import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";

import { Container, Draggable } from "react-smooth-dnd";
import MoreBtn from "./MoreBtn";

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

  .column-title {
    font-size: 14px;
    color: #223555;
    font-weight: 600;
  }
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

const Columns = (props) => {
  const [cards, setCards] = useState([]);

  const { column } = props;

  useEffect(() => {
    if (column) {
      const cardOrder = column.cardOrder;

      column.cards.sort((a, b) => {
        return cardOrder.indexOf(a.id) - cardOrder.indexOf(b.id);
      });

      setCards(column.cards);
    }
  }, []);

  const onCardDrop = (dropResult) => {
    console.log(dropResult);
  };

  return (
    <>
      <ColumnsStyled>
        <ColumnHeadingStyled className="column-drag-handle">
          <div className="column-title ">{column.title}</div>
          <MoreBtn />
        </ColumnHeadingStyled>
        <div className="list-task">
          <Container
            groupName="col"
            onDrop={onCardDrop}
            getChildPayload={(index) => console.log(cards[index])}
            dragClass="card-ghost"
            dropClass="card-ghost-drop"
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
              className: "drop-preview",
            }}
            dropPlaceholderAnimationDuration={100}
          >
            {cards.map((card, index) => (
              <Draggable key={index}>
                <Card title={card.title} />
              </Draggable>
            ))}
          </Container>
        </div>

        <ColumnFooterStyled>
          <div className="add-task">
            {" "}
            <i className="fa-solid fa-plus"></i> Add a card
          </div>
        </ColumnFooterStyled>
      </ColumnsStyled>
    </>
  );
};

export default Columns;
