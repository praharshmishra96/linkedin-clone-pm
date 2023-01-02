import React from 'react'
import styled from '@emotion/styled/macro'
import SearchIcon from '@mui/icons-material/Search'
import HomeIcon from '@mui/icons-material/Home'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import ChatIcon from '@mui/icons-material/Chat'
import NotificationsIcon from '@mui/icons-material/Notifications'
import HeaderOption from './HeaderOption'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth';
import { setSignOut } from '../features/user/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header({userPhoto}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signOutFn = () => {
        signOut(auth)
        .then(() => {
            dispatch(setSignOut());
            navigate("/");
        })
    }

    return (
        <Container>
            <Content>
                <HeaderLeft>
                    <a href="/home">
                        <img src="/images/home-logo.svg" alt="logo" />
                    </a>
                    <HeaderSearch>
                        <SearchIcon />
                        <input type="text" placeholder="Search" />
                    </HeaderSearch>
                    <SignOutMobile onClick={signOutFn}>Sign Out</SignOutMobile>
                </HeaderLeft>
                <HeaderRight>
                    <HeaderOption Icon={HomeIcon} title="Home" />
                    <HeaderOption Icon={SupervisorAccountIcon} title="My Network" />
                    <HeaderOption Icon={BusinessCenterIcon} title="Jobs" />
                    <HeaderOption Icon={ChatIcon} title="Messaging" />
                    <HeaderOption Icon={NotificationsIcon} title="Notifications" />
                    <SignOutWrap>
                        <HeaderOption avatar={userPhoto} title="Me" />
                        <SignOut onClick={signOutFn}>Sign Out</SignOut>
                    </SignOutWrap>
                </HeaderRight>
            </Content>
        </Container>
    )
}

export default Header

const Container = styled.div`
    width: 100%;
    background-color: white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    position: sticky;
    top: 0;
    width: 100vw;
    z-index: 999;
`

const Content = styled.div`
    max-width: 1128px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
`

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;

    img {
        object-fit: contain;
        height: 35px;
        margin-right: 10px;
        margin-bottom: -3px;
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`

const HeaderSearch = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    height: 17px;
    color: rgba(0, 0, 0, 0.9);
    background-color: #eef3f8;

    input {
        outline: none;
        border: none;
        background: none;
    }
`

const HeaderRight = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    @media (max-width: 768px) {
        position: fixed;
        white-space: nowrap;
        left: 0;
        right: 0;
        bottom: 0;
        background: white;
        width: 100%;
        padding: 5px 10px;
    }
`

const SignOut = styled.a`
    position: absolute;
    top: 45px;
    background: white;
    border-radius: 0 0 5px 5px;
    padding: 10px 20px;
    font-size: 13px;
    display: none;
    color: rgba(0, 0, 0, 0.6);
    cursor: pointer;
    &:hover {
        text-decoration: underline;
        color: rgba(0, 0, 0, 0.9);
    }
`

const SignOutMobile = styled.a`
    display: none;

    @media (max-width:768px) {
        display: flex;
        align-self: center;
        margin-left: auto;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.6);
        cursor: pointer;
        &:active {
            text-decoration: underline;
            color: rgba(0, 0, 0, 0.9);
        }
    }
`

const SignOutWrap = styled.div`
    &:hover ${SignOut} {
        align-items: center;
        display: flex;
        justify-content: center;
    }
`