import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/system";
import {
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { Logout, Settings, LockResetOutlined } from "@mui/icons-material";
import { userLogout } from "../../../redux/actions";
import useStyles from "./styles";

const popoverStyle = {
  overflow: "visible",
  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
  mt: 1.5,
  "& .MuiAvatar-root": {
    width: 30,
    height: 30,
    ml: -0.5,
    mr: 1,
  },
  "&:before": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 0,
    right: 14,
    width: 10,
    height: 10,
    bgcolor: "background.paper",
    transform: "translateY(-50%) rotate(45deg)",
    zIndex: 0,
  },
};

const SettingsMenu = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateToPage = (path) => {
    navigate(path);
  };

  return (
    <Box className={classes.settingsMenuContainer}>
      <Tooltip title="Account settings">
        <Box onClick={handleClick}>
          <Avatar
            alt={userInfo.name}
            src={userInfo.logo}
            children={userInfo.name.charAt(0).toUpperCase()}
            className={classes.avatar}
          />
        </Box>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        disableAutoFocusItem
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: { ...popoverStyle },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => navigateToPage("/profile")}>
          <Avatar /> My Profile
        </MenuItem>
        <MenuItem onClick={() => navigateToPage("/help")}>
          <ListItemIcon>
            <LockResetOutlined fontSize="small" />
          </ListItemIcon>
          Help
        </MenuItem>
        <MenuItem onClick={() => navigateToPage("/settings")}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => dispatch(userLogout())}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default SettingsMenu;
