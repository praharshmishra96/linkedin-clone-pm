import React from 'react'
import styled from '@emotion/styled'
import Avatar from '@mui/material/Avatar'
import BookmarkIcon from '@mui/icons-material/Bookmark'

function Leftside({userName, userEmail, userPhoto}) {
    const recentItem = (topic) => {
        return (
            <SidebarRecentItem># {topic}</SidebarRecentItem>
        )
    }

    return (
        <Container>
            <SidebarTop>
                <SidebarBanner>
                    <CoverPhoto></CoverPhoto>
                    <ProfilePhoto src={userPhoto} />
                    <h2>{userName}</h2>
                    <h4>{userEmail}</h4>
                </SidebarBanner>
                <SidebarStats>
                    <SidebarStatOne>
                        <div>
                            <span>Connections</span>
                            <span>Grow your network</span>
                        </div>
                        <p>1,256</p>
                    </SidebarStatOne>
                    <SidebarStatTwo>
                        <p>Who's viewed your profile</p>
                        <p>4,856</p>
                    </SidebarStatTwo>
                </SidebarStats>
                <Item>
                    <ItemIcon />
                    My Items
                </Item>
            </SidebarTop>

            <SidebarBottom>
                <p>Recent</p>
                {recentItem('ModelS')}
                {recentItem('Model3')}
                {recentItem('ModelX')}
                {recentItem('ModelY')}
                {recentItem('SolarRoof')}
                {recentItem('SolarPanels')}
            </SidebarBottom>
        </Container>
    )
}

export default Leftside

const Container = styled.div`
    flex: 0.225;
    position: sticky;
    top: 60px;
    height: fit-content;

    @media (max-width:768px) {
        position: initial;
    }
`

const SidebarTop = styled.div`
    background-color: white;
    border-radius: 10px;
    height: fit-content;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
    margin-bottom: 10px;
`

const SidebarBanner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 15px;

    h2 {
        font-size: 16px;
    }

    h4 {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.6);
    }
`

const CoverPhoto = styled.div`
    background-image: url('/images/card-bg.svg');
    margin-bottom: -32.5px;
    width: 100%;
    height: 75px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-size: cover;
    background-position: center;
`

const ProfilePhoto = styled(Avatar)`
    object-fit: contain;
    height: 60px;
    width: 60px;
    margin-bottom: 10px;
    border: 1px solid white;
`

const SidebarStats = styled.div`
    padding: 15px 10px;
    border-top: 1px solid lightgray;
`

const SidebarStatOne = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    font-weight: 600;
    padding-bottom: 10px;
    div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        span {
            &:first-of-type {
                color: rgba(0, 0, 0, 0.6);
            }
            &:nth-of-type(2) {
                color: rgba(0, 0, 0, 1);
            }
        }
    }
    p {
        color: #0a66c2;
    }
`

const SidebarStatTwo = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.6);

    p {
        &:nth-of-type(2) {
            color: #0a66c2;
        }
    }
`

const ItemIcon = styled(BookmarkIcon)`
    color: rgba(0, 0, 0, 0.6);
`

const Item = styled.div`
    padding: 10px 10px;
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 600;
    border-top: 1px solid lightgray;
    cursor: pointer;
`

const SidebarBottom = styled(SidebarTop)`
    padding: 15px 0;
    p {
        padding-bottom:5px;
        padding-left:10px;
        font-size: 12px;
    }
`

const SidebarRecentItem = styled.div`
    font-size: 12px;
    color: rgba(0, 0, 0, 0.6);
    font-weight: 600;
    padding: 7.5px 10px;
    cursor: pointer;

    &:hover {
        background-color: whitesmoke;
        color: black;
    }
`