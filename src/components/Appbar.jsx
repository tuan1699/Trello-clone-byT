import React from "react";
import styled from "styled-components";

const AppbarStyled = styled.div`
  background: #b0792c;
  color: #fff;
  height: 45px;
  padding: 6px 10px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  border-bottom: 0.001px solid #bd8f4e;

  .app-bar-right {
    display: flex;
    align-items: center;
  }

  .logo:hover {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.3);
  }

  .logo {
    display: block;
    padding: 0px 4px;
    width: 80px;
    border-radius: 3px;
  }

  .flex {
    display: flex;
    align-items: flex-end;
    gap: 8px;
  }

  .border-padding {
    padding: 6px 12px;
    border-radius: 3px;
  }

  .text-edit {
    font-size: 15px;
    font-weight: 400;
  }

  .hover:hover {
    background: #bd9a69;
    cursor: pointer;
  }

  .down {
    font-size: 10px;
  }

  .create {
    background: #b38b53;
  }

  #search {
    padding: 6px 12px 6px 20px;
    border: none;
    border-radius: 3px;
    background: #c09456;
    color: #fff;

    ::placeholder {
      color: #fff;
      opacity: 1; /* Firefox */
    }
  }

  #search:focus {
    outline: none;
    border: none;
    background: #fff;
    color: #000;
    ::placeholder {
      color: #000;
      opacity: 1; /* Firefox */
    }
  }

  .icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon:hover {
    background: #bd9a69;
    cursor: pointer;
  }

  .ring {
    transform: rotate(30deg);
  }
`;

const Appbar = () => {
  return (
    <AppbarStyled>
      <div className="app-bar-right">
        <div className="logo">
          <img
            src="https://a.trellocdn.com/prgb/assets/87e1af770a49ce8e84e3.gif"
            alt="logo"
          />
        </div>

        <div className="hover border-padding flex">
          <p className="text-edit">Workspaces</p>
          <div className="">
            <i className="fa-sharp fa-solid fa-chevron-down down"></i>
          </div>
        </div>

        <div className="hover border-padding flex">
          <p className="text-edit">Recent</p>
          <div className="">
            <i className="fa-sharp fa-solid fa-chevron-down down"></i>
          </div>
        </div>

        <div className="hover border-padding flex">
          <p className="text-edit">Started</p>
          <div className="">
            <i className="fa-sharp fa-solid fa-chevron-down down"></i>
          </div>
        </div>

        <div className="hover border-padding flex">
          <p className="text-edit">Templates</p>
          <div className="">
            <i className="fa-sharp fa-solid fa-chevron-down down"></i>
          </div>
        </div>

        <div className="create text-edit border-padding hover">Create</div>
      </div>

      <div className="app-bar-left flex">
        <div className="search">
          <input type="text" name="" id="search" placeholder="Search" />
        </div>

        <div className="ring icon">
          <i className="fa-solid fa-bell"></i>
        </div>

        <div className="question icon">
          <i className="fa-solid fa-circle-question"></i>
        </div>

        <div className="user icon">
          <i className="fa-solid fa-user"></i>
        </div>
      </div>
    </AppbarStyled>
  );
};

export default Appbar;
