import React from "react";
import styled from "styled-components";

const NavbarStyled = styled.div`
  display: flex;
  justify-content: space-between;
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

  .nav-bar-right {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .star {
    font-size: 12px;
    padding: 9px;
    border-radius: 3px;
    background: #b38b53;
  }

  .line {
    width: 1.5px;
    height: 20px;
    background: #b38b53;
  }

  .work-space {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 8px;
    background: #b38b53;
    border-radius: 3px;
  }

  .work-space p {
    font-size: 14px;
    font-weight: 400;
  }

  .user {
    font-size: 10px;
  }

  .board {
    padding: 6px 12px;
    background: #dfe1e6;
    font-size: 14px;
    font-weight: 400;
    color: #172b4d;
    border-radius: 3px;
  }

  .chart {
    margin-right: 10px;
  }

  .down {
    font-size: 12px;
    padding: 9px;
    border-radius: 3px;
    background: #b38b53;
  }

  .nav-bar-left {
    display: flex;
    gap: 10px;
  }

  .flex {
    display: flex;
    align-items: flex-end;
    gap: 5px;
  }

  .border-padding {
    padding: 6px 12px;
    border-radius: 3px;
    background: #b38b53;
  }

  .text-edit {
    font-size: 14px;
    font-weight: 400;
  }

  .hover:hover {
    background: #bd9a69;
    cursor: pointer;
  }
`;

const Navbar = () => {
  return (
    <NavbarStyled>
      <div className="nav-bar-right">
        <div className="board-title">Navbar</div>

        <i className="fa-regular fa-star star hover"></i>

        <div className="line"></div>

        <div className="work-space hover">
          <p>
            <i className="fa-solid fa-user-group user"></i>
          </p>
          <p>Workspace visible</p>
        </div>

        <div className="line"></div>

        <div className="board hover">
          <i className="fa-solid fa-chart-simple chart"></i>Board
        </div>
        <i className="fa-sharp fa-solid fa-chevron-down down hover"></i>
      </div>

      <div className="nav-bar-left">
        <div className="up flex border-padding hover">
          <i className="fa-solid fa-rocket"></i>
          <p className="text-edit">Power-Ups</p>
        </div>

        <div className="auto flex border-padding hover">
          <i className="fa-solid fa-bolt"></i>
          <p className="text-edit">Automation</p>
        </div>

        <div className="filter flex border-padding hover">
          <i className="fa-solid fa-layer-group"></i>
          <p className="text-edit">Filter</p>
        </div>
      </div>
    </NavbarStyled>
  );
};

export default Navbar;
