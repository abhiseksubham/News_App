import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Table from './Table';

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

function RowData({ rowdata, searchKey = ' ' }) {
  const classes = useStyles();
  const [filteredDom, setfilteredDom] = useState(null);

  let initialresults = (
    <Grid container spacing={24}>
      <Paper className={classes.paper} style={{ width: '60%', paddingTop: 15 }}>
        <Table rowData={rowdata} />
      </Paper>
    </Grid>
  );

  useEffect(() => {
    setfilteredDom(
      <Grid container spacing={24}>
        <Paper
          className={classes.paper}
          style={{ width: '60%', paddingTop: 15 }}
        >
          <Table rowData={rowdata} />
        </Paper>
      </Grid>,
    );
  }, [rowdata]);

  return (
    <div className={classes.root}>
      <div>
        <Box m={3}>
          <Container maxWidth="md">
            <Grid container spacing={3} style={{ width: '1200px' }}>
              {searchKey ? <>{filteredDom} </> : <>{initialresults}</>}
            </Grid>
          </Container>
        </Box>
      </div>
    </div>
  );
}

export default RowData;
