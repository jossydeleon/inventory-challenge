import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route, useHistory, useRouteMatch } from "react-router-dom";
import { PopupMenu } from "../components/PopupMenu";
import { AlertDialog, AlertStateProps } from "../components/AlertDialog";
import DrawerMenu from "../components/layout/DrawerMenu";
import DrawerComponent from "../components/layout/DrawerComponent";
import { SmallLogo } from "../components/logo/ToolbarLogo";
import { Logo } from "../components/logo/Logo";
import { FlexVertical } from "../components/util/Common";
import { useAuth } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../state/Store";
import Products from "./Products";
import Shop from "./Shop";
import Settings from "./Settings";
import Debug from "./Debug";
import { actionSetProducts } from "../state/actions/DatabaseActions";
import {
  FaBug,
  FaDoorOpen,
  FaList,
  FaShoppingBag,
  FaTools,
  FaUser,
} from "react-icons/fa";
import {
  Avatar,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    display: "flex",
    flexDirection: "column",
    padding: "0 20px",
    ...theme.mixins.toolbar,
  },
  smallAvatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

const drawerWidth = 400;
const container = window !== undefined ? () => window.document.body : undefined;

const Root: React.FC = () => {
  //Hook style
  const classes = useStyles();
  //Hook Routes
  const { url } = useRouteMatch();
  //Hook
  const history = useHistory();
  //Hook auth
  const { logout } = useAuth();
  //State to handle popup menu
  const [anchorEl, setAnchorEl] = useState(null);
  //State to handle dialog
  const [dialog, setDialog] = useState<AlertStateProps>({
    open: false,
    title: "",
    message: "",
  });

  //Redux
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootStore) => state.session);
  const { loadingProducts, processingBuy } = useSelector(
    (state: RootStore) => state.database
  );

  useEffect(() => {
    //Load products when user signed
    dispatch(actionSetProducts());
  }, []);

  //Menu for popup list
  const popupMenu = [
    {
      title: "My Profile",
      icon: <FaUser size={"1.2em"} />,
      onClick: () => console.log("My profile"),
    },
    {
      title: "Sign Out",
      icon: <FaDoorOpen size={"1.2em"} />,
      onClick: () => askSignout(),
    },
  ];

  //Menu for Drawer
  const drawerMenu = [
    {
      name: "Shop",
      path: `${url}`,
      exact: true,
      icon: <FaShoppingBag size={"1.5em"} color="white" />,
      component: Shop,
    },
    {
      name: "Products",
      path: `${url}products`,
      exact: true,
      icon: <FaList size={"1.5em"} color="white" />,
      component: Products,
    },
    {
      name: "Settings",
      path: `${url}settings`,
      exact: true,
      icon: <FaTools size={"1.5em"} color="white" />,
      component: Settings,
    },
    {
      name: "Debug",
      path: `${url}debug`,
      exact: true,
      icon: <FaBug size={"1.5em"} color="white" />,
      component: Debug,
    },
  ];

  /**
   * Function to open popup menu when avatar is tapped
   * @param {*} event
   */
  const handlePopup = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Ask user if wants to log out
   */
  const askSignout = () => {
    setDialog({
      open: true,
      title: "Sign out",
      message: "Do you want to log out from your session?",
      actions: {
        negative: {
          label: "No",
          action: () => setDialog({ ...dialog, open: false }),
        },
        positive: {
          label: "Yes, Log off",
          action: () => {
            logout();
          },
        },
      },
    });

    setAnchorEl(null);
  };

  /**
   * Custom Header for Drawer
   * @returns
   */
  const DrawerHeader = () => (
    <div className={classes.drawerHeader}>
      <FlexVertical>
        <Logo type="drawer" align="center" width={150} />

        <IconButton>
          <Avatar
            style={{ height: "58px", width: "58px" }}
            alt={`${user?.name}`}
            src={user?.picture}
          />
        </IconButton>

        <Typography
          style={{
            textAlign: "center",
            paddingBottom: 10,
            fontWeight: "bold",
            color: "white",
            fontSize: 20,
          }}
        >
          {`${user?.name}`}
        </Typography>
      </FlexVertical>
      <Divider />
    </div>
  );

  /**
   * Custom component to display logo
   * @returns
   */
  const LeftComponent = () => <SmallLogo size={180} />;

  /**
   * Custom component to display user's
   * picture button with popup menu
   * @returns
   */
  const RigthComponent = (
    <div>
      <ListItem button onClick={handlePopup}>
        <ListItemAvatar>
          <Avatar
            alt={user?.name}
            src={user?.picture}
            className={classes.smallAvatar}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              style={{ fontSize: 14, color: "white", fontWeight: "bold" }}
            >{`${user?.name}`}</Typography>
          }
        />
      </ListItem>

      <PopupMenu
        anchorEl={anchorEl}
        listMenu={popupMenu}
        onCloseCallback={() => setAnchorEl(null)}
      />
    </div>
  );

  return (
    <div>
      <DrawerComponent
        drawerWidth={drawerWidth}
        container={container}
        progress={loadingProducts || processingBuy}
        menuComponent={<DrawerMenu menu={drawerMenu} />}
        headerComponent={<DrawerHeader />}
        showToolbar={true}
        toolbarLeftComponent={<LeftComponent />}
        toolbarRigthComponent={RigthComponent}
        switchComponent={
          <Switch>
            {drawerMenu.map((route, index) => (
              <Route
                key={index}
                exact={route.exact}
                path={route.path}
                component={route.component}
              />
            ))}
          </Switch>
        }
      />

      <AlertDialog
        show={dialog.open}
        title={dialog.title}
        message={dialog.message}
        negativeButton={dialog?.actions?.negative}
        positiveButton={dialog?.actions?.positive}
        onCloseCallback={() => {
          setDialog({ ...dialog, open: false });
        }}
      />
    </div>
  );
};

export default Root;
