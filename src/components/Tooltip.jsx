import React from "react";
import styled from "styled-components";

const ListActionStyled = styled.div`
  width: 300px;
  min-height: 150px;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  .action-heading {
    font-size: 14px;
    font-weight: 400;
    padding: 8px 0;
    border-bottom: 1px solid #ebecf0;
  }

  .action-item {
    font-size: 14px;
    font-weight: 400;
    text-align: left;
    padding: 10px 0 10px 20px;
    color: #42526e;
  }

  .action-item:hover {
    background: #ebecf0;
  }
`;

const Tooltip = () => {
  return (
    <ListActionStyled>
      <p className="action-heading">List actions</p>
      <p className="action-item">Add card...</p>
      <p className="action-item">Copy list...</p>
      <p className="action-item">Remove list...</p>
      <p className="action-item">Watch</p>
    </ListActionStyled>
  );
};

export default Tooltip;
