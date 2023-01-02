import React from 'react'
import styled from '@emotion/styled'

function UpworkAdd() {
    return (
        <Container>
            <h5>
                <a href="https://www.upwork.com/" target="_blank" rel="noreferrer">Hiring in a hurry? - <span style={{color:"#f3f2ef"}}>i</span></a>
            </h5>
            <p>Find talented pros in record time with Upwork and keep business moving.</p>
        </Container>
    )
}

export default UpworkAdd

const Container = styled.div`
    max-width: 1128px;
    margin: auto;
    padding: 20px 10px 10px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: underline;

    h5 {
        font-size: 14px;
        a {
            color: #0a66c2;
            font-weight: 700;
        }
    }

    p {
        font-size: 14px;
        color: #434649;
        font-weight: 600;
        text-align: center;
    }

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;