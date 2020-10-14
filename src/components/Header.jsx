import React,{useState} from 'react';
import styled from '@emotion/styled';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';


const Container = styled.header `
    background-color:rgba(0,0,0,0.8);
    height:64px;
`

const Header = (props) => {
    const [searchInput, setSearchInput] = useState()
    const [imperialUnit, setimperialUnit] = useState(true)

    function handleChange(e) {
        setSearchInput(e.target.value)
    }

    function handleUnitChange() {
        setimperialUnit(!imperialUnit)
    }

    return (
        <Container>
            <form onSubmit={ (e) => {e.preventDefault();} }>
                <label>Search city</label>
                <input
                    onChange={handleChange}
                ></input>
                <button
                    onClick={() => props.onClick(searchInput, imperialUnit)}
                >Search</button>
            </form>

            <FormGroup row>
            <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>F°</Grid>
                <Grid item>
                    <Switch onChange={handleUnitChange} color="default" />
                </Grid>
                <Grid item>C°</Grid>
            </Grid>
            </FormGroup>

        </Container>
    )
}

export default Header;
