import React from 'react';
import logo from './logo.svg';
import './App.css';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import RowData from './RowData';
import axios from 'axios';
// import useEffect from 'react'
const { useState, useEffect } = React;

const useStyles = makeStyles((theme) => ({
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
    let userData = [];
    const [data, setData] = useState(null)
    const [searchKey, setSearchKey] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=halodoc&origin=*',
      );
      console.log('result.data', result.data)
      setData(result.data);
         console.log('data', data)
    };
 
    fetchData();
  }, []);

  const handleSubmit = e => {
       //searchKey(e.target.value);
    };


  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
             <TextField id="standard-basic" label="Enter Item to search" />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>     
           <Button variant="contained" color="secondary" onClick={handleSubmit()}>
              Submit
          </Button>
          </Paper>
        </Grid>
        
        {data ?
        <>
        <p>data : {data}</p>
        <Grid container spacing={3}>
          <RowData data = {data}/>
            )}
        </Grid>
               </>
        : null}
      </Grid>
    </div>
  );
}

export default App;
