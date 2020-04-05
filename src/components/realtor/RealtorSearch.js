import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { Realtor } from "src/components/realtor/Realtor";
import {
  fetchRealtorsList,
  updateRating,
  createRating
} from "src/actions/Realtors";
import { SearchWithStateSelectForm } from "src/components/shared/forms/SearchWithStateSelectForm";
import { SELECT_ALL } from "src/components/constants/states";

const RealtorSearchComponent = ({
  realtors,
  realtorsCount,
  loading,
  fetchRealtorsList,
  updateRating,
  ratedByMeIds,
  createRating
}) => {
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

  return (
    <Grid container spacing={1} styles={{ justifyContent: "flex-start" }}>
      <SearchWithStateSelectForm
        offset={offset}
        total={realtorsCount}
        setPageNum={setPageNum}
        setOffset={setOffset}
        setState={setState}
        state={state}
      />
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
