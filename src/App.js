import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import RowData from './RowData';
import axios from 'axios';
const { useState, useEffect } = React;
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [searchKey, setSearchKey] = useState(null);
  const [key, setKey] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=halodoc&origin=*',
      );
      setData(result.data);
    };

    fetchData();
  }, []);

  const onSearch = e => {
    const { value } = e.target;
    setSearchKey(value);
  };

  const handleSubmit = () => {
    setKey(searchKey);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={3} style={{ marginBottom: 10 }}>
          <Grid item xs={4}>
            <TextField
              id="standard-basic"
              label="Enter Item to search"
              onChange={onSearch}
            />
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={4} style={{ paddingTop: 10 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>

          {data ? (
            <Grid container spacing={3}>
              <RowData rowdata={data} searchKey={key} />
            </Grid>
          ) : null}
        </Grid>
      </Paper>
    </div>
  );
}

export default App;
