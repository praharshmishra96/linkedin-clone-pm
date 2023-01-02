import React from 'react'
import styled from '@emotion/styled'
import Avatar from '@mui/material/Avatar'

function HeaderOption({avatar, Icon, title}) {
  return (
    <Container>
        {avatar && <ProfilePhoto src={avatar} />}
        {Icon && <Icon />}
        <HeaderOptionTitle>{title}</HeaderOptionTitle>
    </Container>
  )
}

export default HeaderOption

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
    color: rgba(0, 0, 0, 0.6);
    cursor: pointer;
    white-space: nowrap;

    &:hover {
        color: rgba(0, 0, 0, 0.9);
    }
`

const HeaderOptionTitle = styled.h3`
    font-size: 12px;
    font-weight: 400;
`

const ProfilePhoto = styled(Avatar)`
    object-fit: contain;
    height: 25px;
    width: 25px;
`