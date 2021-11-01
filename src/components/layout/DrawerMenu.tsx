import React from "react";
import { Link, useHistory } from "react-router-dom";
import { List, ListItemIcon, ListItemText, ListItem } from "@material-ui/core";

interface ItemMenuProps {
  name: string;
  path: string;
  icon: JSX.Element | React.FunctionComponent;
  component: React.FunctionComponent;
  exact?: boolean;
  hideOnDrawer?: boolean;
}

interface DrawerMenuProps {
  menu: ItemMenuProps[];
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ menu }) => {
  //Hook history
  const history = useHistory();

  /**
   *
   * @param routeName
   * @returns
   */
  const activeRoute = (routeName: string) => {
    return history.location.pathname === routeName ? true : false;
  };

  return (
    <List>
      {menu.map((item, index) => (
        <div key={index}>
          {!item.hideOnDrawer && (
            <ListItem
              button
              component={Link}
              to={item.path}
              selected={activeRoute(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.name}
                disableTypography
                style={{ color: "white", fontWeight: "bold", fontSize: 15 }}
              />
            </ListItem>
          )}
        </div>
      ))}
    </List>
  );
};

export default DrawerMenu;
