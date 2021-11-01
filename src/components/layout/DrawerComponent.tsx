import React, { useState } from "react";
import { Drawer, Hidden, makeStyles, useTheme, Theme } from "@material-ui/core";
import { themeColors } from "../../theme/theme-style";
import DrawerToolbar from "./DrawerToolbar";
import { BrowserRouter } from "react-router-dom";

interface DrawerProps {
  drawerWidth: number;
  headerComponent?: React.FunctionComponent | JSX.Element;
  menuComponent?: React.FunctionComponent | JSX.Element;
  switchComponent: any;
  progress: boolean;
  showToolbar: boolean;
  toolbarLeftComponent?: React.FunctionComponent | JSX.Element;
  toolbarRigthComponent?: React.FunctionComponent | JSX.Element;
  container: any;
}

const useStyles = makeStyles<Theme, DrawerProps>((theme: Theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    ...theme.mixins.toolbar,
  },
  drawer: (props) => ({
    [theme.breakpoints.up("sm")]: {
      width: props.drawerWidth,
      flexShrink: 0,
    },
  }),
  drawerPaper: (props) => ({
    width: props.drawerWidth,
    backgroundColor: themeColors.sidebar.primary,
  }),
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const DrawerComponent: React.FC<DrawerProps> = (props) => {
  const classes = useStyles(props);
  const theme = useTheme();

  const {
    headerComponent,
    menuComponent,
    switchComponent,
    progress,
    showToolbar,
    toolbarLeftComponent,
    toolbarRigthComponent,
    container,
    drawerWidth,
  } = props;

  const [mobileOpen, setMobileOpen] = useState(false);

  /**
   * Function to handle toggle on mobile devices
   */
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const DrawerContent = () => (
    <div style={{ padding: 10 }}>
      {headerComponent && headerComponent}
      {menuComponent && menuComponent}
    </div>
  );

  return (
    <div className={classes.root}>
      <BrowserRouter>
        <nav className={classes.drawer}>
          {/** Toolbar */}
          {showToolbar && (
            <DrawerToolbar
              drawerWidth={drawerWidth}
              progress={progress}
              mobileDrawerToggle={handleDrawerToggle}
              leftComponent={toolbarLeftComponent || undefined}
              rigthComponent={toolbarRigthComponent || undefined}
            />
          )}
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <div className={classes.drawer}>
                <DrawerContent />
              </div>
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              <DrawerContent />
            </Drawer>
          </Hidden>
        </nav>

        {/** Pages to display inside drawer */}
        {switchComponent && (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {switchComponent}
          </main>
        )}
      </BrowserRouter>
    </div>
  );
};

export default DrawerComponent;
