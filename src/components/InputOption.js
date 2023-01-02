import React from 'react'
import styled from '@emotion/styled'

function InputOption({Icon, title, color}) {
  return (
    <Container>
        {Icon && <Icon style={{ color: color }} />}
        <h4>{title}</h4>
    </Container>
  )
}

export default InputOption

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 10px;
    color: rgba(0, 0, 0, 0.6);
    cursor: pointer;
    white-space: nowrap;

    h4 {
        font-size: 14px;
        margin-left: 10px;
    }

    &:hover {
        background-color: whitesmoke;
        border-radius: 5px;
    }
`