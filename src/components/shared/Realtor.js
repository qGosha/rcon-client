import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Popover from "@material-ui/core/Popover";

import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles(theme => ({
  iconButton: {
    borderRadius: 0,
    alignSelf: "flex-start",
    marginLeft: "auto"
  },
  menuIcon: {
    height: "20px",
    width: "20px"
  },
  item: {
    padding: theme.spacing(1)
  },
  popover: {
    pointerEvents: "none"
  },
  popoverText: {
    padding: theme.spacing(1)
  },
  personalInfo: {
    display: "flex"
  },
  name: {
    marginLeft: theme.spacing(1)
  },
  rating: {
    marginTop: theme.spacing(2)
  },
  location: {
    marginTop: theme.spacing(2)
  }
}));

export const Realtor = ({
  realtor,
  toggleConfirmationOpen,
  updateRating,
  createRating,
  hasBeenRated
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [popoverAnchor, setPopoverAnchor] = React.useState(null);

  const handlePopoverOpen = event => {
    setPopoverAnchor(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleChange = data => {
    if (!data.rating) return;

    if (hasBeenRated) {
      updateRating(data);
    } else {
      createRating(data);
    }
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper className={classes.item}>
        <div className={classes.personalInfo}>
          <Avatar>{realtor.first_name[0].toUpperCase()}</Avatar>
          <Typography className={classes.name}>{realtor.first_name}</Typography>
          <Typography className={classes.name}>{realtor.last_name}</Typography>
          <IconButton
            size="small"
            aria-label="more"
            aria-haspopup="true"
            onClick={handleClick}
            className={classes.iconButton}
          >
            <MoreHorizIcon className={classes.menuIcon} />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                //add actual orders sending function
                handleClose();
                toggleConfirmationOpen(true);
              }}
            >
              Send my orders
            </MenuItem>
          </Menu>
        </div>
        <div className={classes.rating}>
          <Popover
            className={classes.popover}
            id="mouse-over-popover"
            open={!!popoverAnchor}
            anchorEl={popoverAnchor}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left"
            }}
            disableRestoreFocus
            onClose={handlePopoverClose}
          >
            <div className={classes.popoverText}>
              <p>
                Rating: <b>{realtor.rating}</b>
              </p>
              <p>
                Total votes: <b>{realtor.raters_total}</b>
              </p>
            </div>
          </Popover>

          <Rating
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            name={`rating-for-${realtor.id}`}
            value={realtor.rating}
            onChange={event =>
              handleChange({ id: realtor.id, rating: event.target.value })
            }
          />
        </div>
        <Typography className={classes.location}>{`Location: ${realtor.city ||
          ""}, ${realtor.state || ""}`}</Typography>
      </Paper>
    </Grid>
  );
};

Realtor.propTypes = {
  realtor: PropTypes.object.isRequired,
  toggleConfirmationOpen: PropTypes.func.isRequired,
  updateRating: PropTypes.func.isRequired,
  createRating: PropTypes.func.isRequired,
  hasBeenRated: PropTypes.bool.isRequired
};
