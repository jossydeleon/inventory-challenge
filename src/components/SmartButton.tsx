import React from "react";
import { IconButton } from "@material-ui/core";

interface SmartButtonsProps {
  buttons: JSX.Element[];
  actions: any;
  condition?: boolean;
}

export const SmartButtons: React.FC<SmartButtonsProps> = ({
  buttons,
  actions,
  condition,
}) => {
  return (
    <IconButton
      aria-label="action"
      onClick={condition ? actions[0] : actions[1]}
    >
      {condition ? buttons[0] : buttons[1]}
    </IconButton>
  );
};
