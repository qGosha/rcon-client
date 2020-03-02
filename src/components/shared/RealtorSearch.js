import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import Pagination from "material-ui-flat-pagination";
import CssBaseline from "@material-ui/core/CssBaseline";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { states } from "src/components/constants/states";

import { Realtor } from "src/components/shared/Realtor";
import {
  fetchRealtorsList,
  updateRating,
  createRating
} from "src/actions/Realtors";

const SELECT_ALL = "Select all";

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: "flex-start"
  },
  paginator: {
    textAlign: "center",
    width: "100%",
    marginBottom: theme.spacing(2)
  }
}));

const RealtorSearchComponent = ({
  realtors,
  realtorsCount,
  loading,
  fetchRealtorsList,
  updateRating,
  ratedByMeIds,
  createRating
}) => {
  const classes = useStyles();
  const [pageNum, setPageNum] = useState(1);
  const [offset, setOffset] = useState(0);
  const [isConfirmationOpen, toggleConfirmationOpen] = useState(false);

  const [state, setState] = useState(SELECT_ALL);

  useEffect(() => {
    setPageNum(1);
    setOffset(0);
  }, [state]);

  useEffect(() => {
    fetchRealtorsList({
      page: pageNum,
      per_page: 10,
      state: state === SELECT_ALL ? null : state
    });
  }, [pageNum, fetchRealtorsList, state]);

  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Grid container spacing={1} className={classes.root}>
      <Grid item xs={12} lg={6}>
        <Pagination
          limit={10}
          offset={offset}
          total={realtorsCount}
          size={isMobile ? "small" : "medium"}
          onClick={(e, offset, pageNum) => {
            setPageNum(pageNum);
            setOffset(offset);
          }}
          className={classes.paginator}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <FormControl fullWidth>
          <InputLabel required id="state-label">
            Filter by state
          </InputLabel>
          <Select
            labelId="state-label"
            id="state-id"
            value={state}
            style={{ minWidth: "60px" }}
            onChange={({ target }) => setState(target.value)}
          >
            {[SELECT_ALL, ...states].map(state => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <CssBaseline />
      {!loading &&
        realtors.map(realtor => (
          <Realtor
            key={realtor.id}
            realtor={realtor}
            toggleConfirmationOpen={toggleConfirmationOpen}
            updateRating={updateRating}
            hasBeenRated={ratedByMeIds.includes(realtor.id)}
            createRating={createRating}
          />
        ))}
      <Dialog
        open={isConfirmationOpen}
        onClose={() => toggleConfirmationOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Send my orders"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to send all your orders to this realtor?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggleConfirmationOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => toggleConfirmationOpen(false)}
            color="primary"
            autoFocus
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

RealtorSearchComponent.propTypes = {
  realtors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchRealtorsList: PropTypes.func.isRequired,
  realtorsCount: PropTypes.number.isRequired,
  updateRating: PropTypes.func.isRequired,
  ratedByMeIds: PropTypes.array.isRequired,
  createRating: PropTypes.func.isRequired
};

RealtorSearchComponent.defaultProps = {
  realtors: []
};

const mapStateToProps = state => ({
  realtors: state.realtors.items,
  loading: state.realtors.loading,
  realtorsCount: state.realtors.totalCount,
  ratedByMeIds: state.realtors.ratedByMeIds
});

export const RealtorSearch = connect(mapStateToProps, {
  fetchRealtorsList,
  updateRating,
  createRating
})(RealtorSearchComponent);
