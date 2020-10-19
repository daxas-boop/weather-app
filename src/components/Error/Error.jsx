import React from 'react'
import styled from '@emotion/styled';
import errorIcon from './error_icon.png';

const ErrorImage = styled.img `
    width:300px;
    margin:0 auto;
`
const ErrorText = styled.span `
    font-family:'Roboto';
    font-size:20px;
    margin:0 auto;
    margin-bottom:5px;
    color:black;
`

const Error = () => {
    return (
        <>
            <ErrorText>Something went wrong</ErrorText>
            <ErrorImage src={errorIcon} alt='Error icon'></ErrorImage>
        </>
    )
}

export default Error;