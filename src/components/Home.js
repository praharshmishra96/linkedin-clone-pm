import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import Header from './Header';
import UpworkAdd from './UpworkAdd';
import Leftside from "./Leftside";
import Main from "./Main";
import Rightside from "./Rightside";
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth';
import { selectUserName, selectUserEmail, selectUserPhoto, setUserLogin } from '../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';

function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userName = useSelector(selectUserName);
    const userEmail = useSelector(selectUserEmail);
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUserLogin({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }))
            } else {
                navigate("/");
            }
        });
    }, [dispatch, navigate]);

    return (
        <>
        {userName ? (
            <Container>
                <Header userPhoto={userPhoto} />
                <UpworkAdd />
                <Layout>
                    <Leftside userName={userName} userEmail={userEmail} userPhoto={userPhoto} />
                    <Main userName={userName} userEmail={userEmail} userPhoto={userPhoto} />
                    <Rightside />
                </Layout>
            </Container>
        ) : (
            <ProgressContainer>
                <CircularProgress />
            </ProgressContainer>
        )}
        </>
    )
}

export default Home

const Container = styled.div`
    @media (max-width:768px) {
        padding-bottom: 60px;
    }
`

const ProgressContainer = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Layout = styled.div`
    max-width: 1128px;
    margin: auto;
    display: flex;
    padding: 10px 10px;
    @media (max-width:768px) {
        display: flex;
        flex-direction: column;
    }
`