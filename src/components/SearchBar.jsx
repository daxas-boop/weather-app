import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import styled from '@emotion/styled';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
  })
);

const SearchForm = styled(Paper)`
  padding: 2px 4px;
  display: flex;
  align-items: center;
  width: 400px;
  max-width: 100%;
  margin: auto;
  margin-top: 3rem;
  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

export default function SearchBar(props) {
  const classes = useStyles();
  const [input, setInput] = useState('');

  return (
    <SearchForm
      component="form"
      className={classes.root}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <InputBase
        placeholder="Search city"
        inputProps={{ 'aria-label': 'Search city' }}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        className={classes.input}
        value={input}
      />
      <IconButton
        className={classes.iconButton}
        type="submit"
        aria-label="search"
        onClick={() => props.handleSearch(input)}
      >
        <SearchIcon />
      </IconButton>
    </SearchForm>
  );
}
