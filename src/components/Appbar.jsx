import React from "react";
import styled from "styled-components";

const AppbarStyled = styled.div`
  background: #b0792c;
  color: yellow;
  height: 45px;
  padding: 6px 10px;
  text-align: center;
  display: flex;
  align-items: center;
  border-bottom: 0.001px solid #bd8f4e;

  &:hover .logo {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.3);
  }

  .logo {
    display: block;
    padding: 0px 4px;
    width: 80px;
    border-radius: 3px;
  }
`;

const Appbar = () => {
  return (
    <AppbarStyled>
      <div className="logo">
        <img
          src="https://a.trellocdn.com/prgb/assets/87e1af770a49ce8e84e3.gif"
          alt="logo"
        />
      </div>
    </AppbarStyled>
  );
};

export default Appbar;
