import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { Toolbar, Typography, AppBar, IconButton } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import { themeColors } from "../theme/theme-style";
import { Close } from "@material-ui/icons";

interface ToolbarModalProps {
  title: string;
  progress?: boolean;
  onClose?: () => any;
  rigthComponent?: JSX.Element;
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const ToolbarModal: React.FC<ToolbarModalProps> = (props) => {
  const classes = useStyles();
  const { title, progress, onClose, rigthComponent } = props;

  return (
    <AppBar className={classes.appBar}>
      <StyleToolbar>
        {onClose && (
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <Close />
          </IconButton>
        )}

        <Typography variant="h6" className={classes.title} component="div">
          {title}
        </Typography>
        {rigthComponent && rigthComponent}
      </StyleToolbar>
      {progress && <LinearProgress color="secondary" />}
    </AppBar>
  );
};

const StyleToolbar = styled(Toolbar)`
  //background: ${themeColors.primary};
  color: white;
  .MuiIconButton-root {
    color: white;
  }
`;

export default ToolbarModal;
