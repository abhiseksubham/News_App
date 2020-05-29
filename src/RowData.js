import React from 'react';
import logo from './logo.svg';
import './App.css';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
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

// let userData;
// async function fetchdata(){
//   // Load async data from an inexistent endpoint.
//   userData = await axios.get("https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=halodoc&origin=*");
//   console.log(userData)
// }

function RowData({rowdata}) {
  const classes = useStyles();
//  console.log('name',name);
 console.log('rowdata',rowdata)

  const jsondata =[];
  let index = 0;
  let names, links;

  for (let i = 0; i <rowdata.data.length;i++){
    if(i=== 1){
      names =rowdata.data[i]
    }
    if(i === 3){
      links = rowdata.data[i];
    }
  
  }


  return (
    <div className={classes.root}>
      <div>
          <Box m={3}>
          <Container maxWidth="md">
            <Grid container spacing={3} style={{width:'1200px'}}>
              {names.map((item, key) =>
            <Paper className={classes.paper}>
                <Typography> {item} <span style={{cursor: 'pointer'}}>{links[key]}</span></Typography>
            </Paper>
              
              )}
           </Grid>
           </Container>
           </Box>
      </div>
    </div>
  );
}

export default RowData;