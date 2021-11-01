import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import {
  AppBar,
  IconButton,
  LinearProgress,
  makeStyles,
  Theme,
  Toolbar,
} from "@material-ui/core";

interface DrawerToolbarProps {
  progress: boolean;
  mobileDrawerToggle: () => any;
  leftComponent?: React.FunctionComponent | JSX.Element;
  rigthComponent?: React.FunctionComponent | JSX.Element;
  drawerWidth: number;
}

const useStyles = makeStyles<Theme, DrawerToolbarProps>((theme: Theme) => ({
  appBar: (props) => ({
    marginLeft: props.drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${props.drawerWidth}px)`,
    },
  }),
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbarDesktop: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  toolbarMobile: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

const DrawerToolbar: React.FC<DrawerToolbarProps> = (props) => {
  const classes = useStyles(props);

  const { progress, mobileDrawerToggle, leftComponent, rigthComponent } = props;

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        {/* Toolbar for mobile */}
        <div className={classes.toolbarMobile}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={mobileDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          {leftComponent && leftComponent}
          {rigthComponent && rigthComponent}
        </div>
        {/* ******************************************* */}

        {/* Toolbar for desktop */}
        <div className={classes.toolbarDesktop}>
          {leftComponent && leftComponent}
          {rigthComponent && rigthComponent}
        </div>
        {/* ******************************************* */}
      </Toolbar>

      {
        /** Display progress bar if any of the loading is active */
        progress && <LinearProgress />
      }
    </AppBar>
  );
};

export default DrawerToolbar;
