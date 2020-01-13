import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { RouterLink } from "src/components/shared/RouterLink";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  textContainer: {
    marginRight: theme.spacing(1),
    display: "flex",
    flexDirection: "column"
  },
  iconButton: {
    borderRadius: 0
  },
  menuIcon: {
    height: "20px",
    width: "20px"
  },
  headerContainer: {
    display: "flex",
    alignItems: "center"
  }
}));
const orderTypes = ["Buy", "Sell"];

export const Order = ({ order, deleteOrder }) => {
  const classes = useStyles();
  const { city, state, zip } = order.address;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <Grid item>
      <Paper className={classes.paper}>
        <div className={classes.headerContainer}>
          <IconButton
            size="small"
            aria-label="more"
            aria-haspopup="true"
            onClick={handleClick}
            className={classes.iconButton}
          >
            <MoreVertIcon className={classes.menuIcon} />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              component={RouterLink}
              to={`/dashboard/order/edit/step1/${order.id}`}
            >
              Edit
            </MenuItem>
            <MenuItem onClick={() => deleteOrder(order.id)}>Delete</MenuItem>
          </Menu>
          <Avatar className={classes.avatar}>
            <HomeWorkIcon />
          </Avatar>
        </div>
        <Typography variant="h6">
          <em>{`I want to ${orderTypes[order.order_type]} real estate`}</em>
        </Typography>

        <div className={classes.textContainer}>
          <Typography variant="subtitle1">{`City: ${city}`}</Typography>
          <Typography variant="subtitle1">{`State: ${state}`}</Typography>
          <Typography variant="subtitle1">{`Zip: ${zip}`}</Typography>
        </div>
      </Paper>
    </Grid>
  );
};

Order.propTypes = {
  order: PropTypes.object.isRequired,
  deleteOrder: PropTypes.func.isRequired
};
