import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import {
  Typography,
  Badge,
  IconButton,
  Tooltip,
  Menu,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { Box } from "@mui/system";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { useDispatch, useSelector } from "react-redux";
import {
  listNotifications,
  markAllRead,
  markAsRead,
} from "../../../redux/actions";
import { rolesEnum } from "../../../layouts/DashboardLayout/pages";

import useStyles from "./styles";

const BasicMenu = ({
  anchorEl,
  handleClose,
  open,
  menuItems,
  markNotificationAsRead,
  markAllAsRead,
  viewAll,
  unreadCount,
  checked,
  redirect,
}) => {
  const classes = useStyles();
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      classes={{ root: classes.root }}
    >
      <Box elevation={1} className={classes.notificationContainer}>
        <Box className={classes.header}>
          <FormControlLabel
            className={classes.label}
            control={
              <Switch
                onChange={({ target }) => viewAll(target.checked)}
                size="small"
                checked={checked}
              />
            }
            label="Show all"
          />
          {unreadCount ? (
            <Box className={classes.markAll} onClick={markAllAsRead}>
              Mark all as read
            </Box>
          ) : (
            ""
          )}
        </Box>
        <Box className={classes.scrollContainer}>
          {menuItems.length ? (
            menuItems.map((item) => (
              <Box
                className={classes.menuItem}
                key={item.id}
                onClick={
                  item.need_redirection ? () => redirect(item) : () => {}
                }
              >
                <Typography
                  variant="body1"
                  className={
                    item.need_redirection
                      ? classes.menuItemEnabled
                      : classes.menuItemDisabled
                  }
                >
                  {item.title}
                </Typography>
                <Tooltip title="Mark as read">
                  <Badge
                    className={
                      item.is_read
                        ? clsx(classes.unread, classes.hidden)
                        : classes.unread
                    }
                    variant="dot"
                    anchorOrigin={{ vertical: "center", horizontal: "center" }}
                    color="primary"
                    onClick={(e) => {
                      markNotificationAsRead(item.id);
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  />
                </Tooltip>
              </Box>
            ))
          ) : (
            <Box className={classes.empty}>
              <Box>No notification</Box>
            </Box>
          )}
        </Box>
      </Box>
    </Menu>
  );
};

const NotificationIcon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [checked, setChecked] = useState(false);

  const role = useSelector((state) => state.auth.role);
  const notifications = useSelector(
    (state) => state.dashboard.notificationList.data
  );

  const unreadCount = notifications.filter((item) => !item.is_read).length;
  const isAuditor = role === rolesEnum.AUDITOR;

  const newNotifications = `You have ${unreadCount} new notifications`;
  const noNotifications = "No new notifications";

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const markNotificationAsRead = (id) => {
    dispatch(markAsRead({ id, isAuditor, unread: !checked }));
  };

  const markAllAsRead = () => {
    dispatch(markAllRead({ unread: !checked, isAuditor }));
  };

  const viewAll = (viewMessages) => {
    setChecked(viewMessages);
    dispatch(listNotifications({ unread: !viewMessages, isAuditor }));
  };

  const redirect = ({ id, form, form_id, is_read }) => {
    !is_read && markNotificationAsRead(id);
    if (form === "ticket") {
      navigate(`/tickets/id?ticketId=${form_id}`);
    } else if (form === "audit") {
      navigate(`/audit-status/audit-summary/?id=${form_id}`);
    } else if (form === "approval") {
      navigate(`/approval-status/null?&id=${form_id}`);
    }
    handleClose();
  };

  useEffect(() => {
    dispatch(listNotifications({ unread: true, isAuditor }));
  }, [dispatch, isAuditor]);

  return (
    <Box>
      <Tooltip title={unreadCount ? newNotifications : noNotifications}>
        <IconButton onClick={handleOpen} anchorEl={anchorEl}>
          <Badge badgeContent={unreadCount} color="error" max={9}>
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <BasicMenu
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        menuItems={notifications}
        markNotificationAsRead={markNotificationAsRead}
        markAllAsRead={markAllAsRead}
        viewAll={viewAll}
        unreadCount={unreadCount}
        checked={checked}
        redirect={redirect}
      />
    </Box>
  );
};

export default NotificationIcon;
