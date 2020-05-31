import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
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

function RowData({ rowdata, searchKey }) {
  const classes = useStyles();
  let names,
    links,
    searchresults = null;
  const [filteredDom, setfilteredDom] = useState(null);

  for (let i = 0; i < rowdata.length; i++) {
    if (i === 1) {
      names = rowdata[i];
    }
    if (i === 3) {
      links = rowdata[i];
    }
  }
  let filtered = names;

  useEffect(() => {
    filtered = names.filter(function (str) {
      return str.match(searchKey);
    });

    searchresults = filtered.map((name, key) => (
      <Grid container spacing={24}>
        <Paper
          className={classes.paper}
          style={{ width: '60%', paddingTop: 15 }}
        >
          <Typography>
            {name}{' '}
            <span style={{ cursor: 'pointer' }}>
              <a href={links[key]}>View</a>
            </span>
          </Typography>
        </Paper>
      </Grid>
    ));
    setfilteredDom(searchresults);
  }, [searchKey]);

  let initialresults = names.map((name, key) => (
    <Grid container spacing={24}>
      <Paper className={classes.paper} style={{ width: '60%', paddingTop: 15 }}>
        <Typography>
          {name}{' '}
          <span style={{ cursor: 'pointer' }}>
            <a href={links[key]}>View</a>
          </span>
        </Typography>
      </Paper>
    </Grid>
  ));

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
