import React from "react";
import styled from "styled-components";

const AddColumnStyled = styled.div`
  width: 272px;
  background: #c1985e;
  padding: 14px 12px;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  flex-shrink: 0;
  margin-left: 5px;
  box-shadow: rgb(27 27 27 / 16%) -1px 20px 20px 0px;
  border-radius: 3px;
  transition: all ease 0.2s;

  &:hover {
    background: #c29d6a;
    cursor: pointer;
  }
`;

const AddColumn = () => {
  return (
    <AddColumnStyled>
      <i className="fa-solid fa-plus"></i> Add another list
    </AddColumnStyled>
  );
};

export default AddColumn;
