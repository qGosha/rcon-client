import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { mailMyOrders } from "src/actions/Orders";
import {
  createRating,
  fetchRealtorsList,
  updateRating
} from "src/actions/Realtors";
import { SELECT_ALL } from "src/components/constants/states";
import { Realtor } from "src/components/realtor/Realtor";
import { SearchWithStateSelectForm } from "src/components/shared/forms/SearchWithStateSelectForm";

const RealtorSearchComponent = ({
  realtors,
  realtorsCount,
  loading,
  fetchRealtorsList,
  updateRating,
  ratedByMeIds,
  createRating,
  sentOrdersToIds,
  mailMyOrders
}) => {
  const [pageNum, setPageNum] = useState(1);
  const [offset, setOffset] = useState(0);
  const [isConfirmationOpen, toggleConfirmationOpen] = useState(false);
  const [activeRealtor, setActiveRealtor] = useState(null);
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
            setActiveRealtor={setActiveRealtor}
            sentOrdersToOrHasResponded={sentOrdersToIds.includes(realtor.id)}
          />
        ))}
      <Dialog
        open={isConfirmationOpen}
        onClose={() => toggleConfirmationOpen(false)}
        onExit={() => setActiveRealtor(null)}
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
            onClick={() => {
              mailMyOrders({ realtor_id: activeRealtor });
              toggleConfirmationOpen(false);
            }}
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
  createRating: PropTypes.func.isRequired,
  mailMyOrders: PropTypes.func.isRequired,
  sentOrdersToIds: PropTypes.array.isRequired
};

RealtorSearchComponent.defaultProps = {
  realtors: []
};

const mapStateToProps = state => ({
  realtors: state.realtors.items,
  loading: state.realtors.loading,
  realtorsCount: state.realtors.totalCount,
  ratedByMeIds: state.realtors.ratedByMeIds,
  sentOrdersToIds: state.realtors.sentOrdersToIds
});

export const RealtorSearch = connect(mapStateToProps, {
  fetchRealtorsList,
  updateRating,
  createRating,
  mailMyOrders
})(RealtorSearchComponent);
