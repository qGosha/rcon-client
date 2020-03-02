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

import { Realtor } from "src/components/shared/Realtor";
import {
  fetchRealtorsList,
  updateRating,
  createRating
} from "src/actions/Realtors";

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

  useEffect(() => {
    fetchRealtorsList({
      page: pageNum,
      per_page: 10
    });
  }, [pageNum, fetchRealtorsList]);

  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Grid container spacing={1} className={classes.root}>
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
