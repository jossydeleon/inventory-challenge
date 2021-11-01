import React, { useEffect, useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { ListItemIcon, Typography } from "@material-ui/core";

export interface ItemPopupProps {
  title: string;
  icon: JSX.Element;
  onClick: () => any;
}

interface Props {
  anchorEl: any;
  listMenu: ItemPopupProps[];
  onCloseCallback: any;
}

export const PopupMenu: React.FC<Props> = ({
  anchorEl,
  listMenu,
  onCloseCallback,
}) => {
  const [anchor, setAnchorEl] = useState(null);

  useEffect(() => {
    setAnchorEl(anchorEl);
  }, [anchorEl]);

  const handleClose = () => {
    setAnchorEl(null);
    onCloseCallback();
  };

  return (
    <div>
      <Menu
        id="simple-menu"
        anchorEl={anchor}
        keepMounted
        open={Boolean(anchor)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {listMenu.map((item, index) => (
          <MenuItem key={index} onClick={item.onClick}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <Typography style={{ fontSize: 13 }}>{item.title}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
