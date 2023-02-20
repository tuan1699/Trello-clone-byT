import React from "react";
import styled from "styled-components";

const NavbarStyled = styled.div`
  display: flex;
  align-items: center;
  background: #a06e28;
  height: 45px;
  padding: 6px 14px;
  color: #fff;
  font-weight: 600;

  .board-title {
    padding: 6px 4px;
    border-radius: 3px;
    &:hover {
      cursor: pointer;
      background: rgba(255, 255, 255, 0.3);
    }
  }
`;

const Navbar = () => {
  return (
    <NavbarStyled>
      <div className="board-title">Navbar</div>
    </NavbarStyled>
  );
};

export default Navbar;
