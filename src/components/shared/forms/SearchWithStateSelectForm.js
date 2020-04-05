import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import Pagination from "material-ui-flat-pagination";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { states } from "src/components/constants/states";

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

export const SearchWithStateSelectForm = ({
  offset,
  total,
  setPageNum,
  setOffset,
  setState,
  state
}) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12}>
        <Pagination
          limit={10}
          offset={offset}
          total={total}
          size={isMobile ? "small" : "medium"}
          onClick={(e, offset, pageNum) => {
            setPageNum(pageNum);
            setOffset(offset);
          }}
          className={classes.paginator}
        />
      </Grid>
      <Grid item xs={12}>
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
    </>
  );
};

SearchWithStateSelectForm.propTypes = {
  offset: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  setPageNum: PropTypes.func.isRequired,
  setOffset: PropTypes.func.isRequired,
  setState: PropTypes.func.isRequired,
  state: PropTypes.string.isRequired
};
