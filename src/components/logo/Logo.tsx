import React, { useEffect, useState } from "react";
import styled from "styled-components";
import large_logo from "../../resources/images/large_logo.png";
import small_logo from "../../resources/images/small_logo.png";
import toolbar_logo from "../../resources/images/toolbar_logo.png";

interface LogoProps {
  type?: "toolbar" | "drawer" | "normal";
  align?: "center" | "left" | "right";
  width?: number;
}

export const Logo: React.FC<LogoProps> = ({ type, align, width }) => {
  const [imageLogo, setImageLogo] = useState("");

  useEffect(() => {
    if (type === "drawer") {
      setImageLogo(small_logo);
    } else if (type === "toolbar") {
      setImageLogo(toolbar_logo);
    } else {
      setImageLogo(large_logo);
    }
  }, [type]);

  return (
    <Container>
      <Image src={imageLogo} style={{ width: width }} />
    </Container>
  );
};

Logo.defaultProps = {
  type: "normal",
  align: "center",
  width: 200,
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Image = styled.img`
  width: 70%;
  height: 20%;
  @media only screen and (max-width: 768px) {
    max-width: 80%;
    height: 30%;
  }
`;
