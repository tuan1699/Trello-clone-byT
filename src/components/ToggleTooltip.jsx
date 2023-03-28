import React from "react";

import styled from "styled-components";

const MoreBtnStyled = styled.div`
  position: relative;
  font-weight: 700;
  letter-spacing: 1px;
  text-align: center;
  border-radius: 3px;

  .more-btn {
    width: 32px;
    height: 32px;
    color: #6b778c;
  }

  &:hover {
    background: #dadbe2;
  }
`;

const ToggleTooltip = () => {
  return (
    <MoreBtnStyled>
      <div className="more-btn">...</div>
    </MoreBtnStyled>
  );
};

export default ToggleTooltip;
