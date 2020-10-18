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

const ErrorInfo = styled.p `
    font-family:'Roboto';
    font-size:14px;
    margin:0 auto;
    margin-bottom:15px;
    color:black;
`

const Error = (error) => {
    return (
        <>
            <ErrorText>Something went wrong</ErrorText>
            <ErrorInfo>{error.error.message}</ErrorInfo>
            <ErrorImage src={errorIcon} alt='Error icon'></ErrorImage>
        </>
    )
}

export default Error;