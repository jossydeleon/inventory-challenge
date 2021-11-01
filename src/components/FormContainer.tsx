import React from "react";
import styled from "styled-components";
import { themeColors } from "../theme/theme-style";

const FormContainer: React.FC = ({ children }) => {
  return <FormStyle>{children}</FormStyle>;
};

const FormStyle = styled.div`
  width: 100%;
  .MuiTextField-root {
    width: 100%;
    margin-top: 10px;
  }
  a {
    color: ${themeColors.primary};
    &:hover {
      color: ${themeColors.primaryDark};
    }
  }
`;

export default FormContainer;
