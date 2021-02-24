import React from 'react';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Button from '@material-ui/core/Button';
import styled from '@emotion/styled';

const SwitchContainer = styled.label`
  display: flex;
  align-items: center;
`;

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
`;

export default function Navbar(props) {
  return (
    <Container>
      <SwitchContainer>
        <Grid item>F°</Grid>
        <Grid item>
          <Switch onChange={props.handleUnitChange} value={props.imperialUnit} color="default" />
        </Grid>
        <Grid item>C°</Grid>
      </SwitchContainer>

      <Button
        variant="contained"
        color="primary"
        endIcon={<LocationOnIcon />}
        onClick={props.handleGeolocationChange}
      >
        Find me
      </Button>
    </Container>
  );
}
