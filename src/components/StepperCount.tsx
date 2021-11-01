import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";

interface StepperCountProps {
  max: number;
  onChangeValue: (value: number) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
    paddingRight: 10,
    paddingLeft: 10,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const StepperCount: React.FC<StepperCountProps> = ({
  max,
  onChangeValue,
}) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  useEffect(() => {
    onChangeValue(activeStep);
  }, [activeStep]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Container>
      <IconButton
        aria-label="back"
        className={classes.margin}
        size="small"
        disabled={activeStep === 0}
        onClick={handleBack}
      >
        <Remove fontSize="inherit" />
      </IconButton>
      {activeStep}
      <IconButton
        aria-label="next"
        className={classes.margin}
        size="small"
        disabled={activeStep === max}
        onClick={handleNext}
      >
        <Add fontSize="inherit" />
      </IconButton>
    </Container>
  );
};
