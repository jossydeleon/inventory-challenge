/**
 * This component is a toolbar, that can have multiple
 * buttons and a custom title
 */

import React from "react";
import { IconButton } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

interface WindowToolbarProps {
  title?: string;
  backButton?: boolean;
  buttons?: [];
}

export const WindowToolbar: React.FC<WindowToolbarProps> = (props) => {
  const history = useHistory();
  const { title, backButton, buttons } = props;

  return (
    <div>
      {/** Container */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex" }}>
          {
            //BackButton
            backButton && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <IconButton
                  style={{ marginRight: "5px" }}
                  onClick={() => history.goBack()}
                >
                  <ArrowBack />
                </IconButton>
              </div>
            )
          }

          {
            //Title
            title && <h2>{title}</h2>
          }
        </div>

        {/** Buttons */}
        {buttons && (
          <div style={{ display: "flex", alignItems: "center" }}>
            {buttons.map((button, index) => (
              <div key={index}> {button} </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
