import React from "react";
import styled from "styled-components";
import toolbar_logo from "../../resources/images/toolbar_logo.png";

interface SmallLogoProps {
  size?: number;
}

export const SmallLogo: React.FC<SmallLogoProps> = ({ size }) => {
  return (
    <Container>
      <Image
        src={toolbar_logo}
        alt="Inventory Tracker"
        style={{ width: size }}
      />
    </Container>
  );
};

SmallLogo.defaultProps = {
  size: 250,
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
`;

const Image = styled.img`
  width: 70%;
  height: 20%;
  @media only screen and (max-width: 768px) {
    max-width: 80%;
    height: 30%;
  }
`;
