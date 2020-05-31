import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import RowData from './RowData';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import HackerNews from './HackerNews';

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
  const [source, setSource] = useState('Halo-Wiki');
  const [hackerdata, sethackerdata] = useState(null);
  const [filteredAuthors, setfilteredAuthors] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=halodoc&origin=*',
      );
      setData(result.data);
    };

    fetchData();
  }, []);

  //Fetch author details
  useEffect(() => {
    const fetchData = async () => {
      await axios('http://hn.algolia.com/api/v1/search?query=').then(res =>
        getCounts(res),
      );
    };
    fetchData();
  }, []);

  useEffect(() => {
    sethackerdata(hackerdata?.filter(p => p.author === searchKey));
  }, [searchKey]);

  //FetchCounts , mutate json, setData
  const getCounts = res => {
    let news = res.data.hits;
    console.log('hackerdata', res.data.hits);
    res.data.hits.map((item, key) => {
      axios
        .get('https://hn.algolia.com/api/v1/users/' + item?.author)
        .then(res => (news[key].submission_count = res.data.submission_count));
      return 0;
    });
    console.log('after mutating array', news);
    sethackerdata(news);
  };

  const onSearch = e => {
    const { value } = e.target;
    setSearchKey(value);
  };

  const handleSubmit = () => {
    setKey(searchKey);
  };

  const handleChange = e => {
    console.log(e.target.value);
    setSource(e.target.value);
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
            <InputLabel id="demo-simple-select-label">Source</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={source}
              onChange={handleChange}
              defaultValue={'HaloWiki'}
            >
              <MenuItem value={'HaloWiki'} selected>
                HaloWiki
              </MenuItem>
              <MenuItem value={'Hacker News'}>Hacker News</MenuItem>
            </Select>
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

          {data && source === 'HaloWiki' ? (
            <Grid container spacing={3}>
              <RowData rowdata={data} searchKey={key} />
            </Grid>
          ) : null}

          {data && source === 'Hacker News' ? (
            <Grid container spacing={3}>
              <HackerNews rowdata={hackerdata} searchKey={key} />
            </Grid>
          ) : null}
        </Grid>
      </Paper>
    </div>
  );
}

export default App;
