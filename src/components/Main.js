import React, { useState } from 'react'
import styled from '@emotion/styled'
import Avatar from '@mui/material/Avatar'
import InputOption from './InputOption'
import ImageIcon from '@mui/icons-material/Image';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ViewDayIcon from '@mui/icons-material/ViewDay';
import Post from './Post';
import PostModal from './PostModal';

function Main({userName, userEmail, userPhoto}) {
    const [showModal, setShowModal] = useState("close");

    const clickHandler = (event) => {
        event.preventDefault();
        if (event.target !== event.currentTarget) {
            return;
        }
        switch (showModal) {
            case "open":
                setShowModal("close");
                break;
            case "close":
                setShowModal("open");
                break;
            default:
                setShowModal("close");
                break;
        }
    };


    return (
        <Container>
            <FeedInputContainer>
                <FeedInput>
                    <ProfilePhoto src={userPhoto} />
                    <button onClick={clickHandler}>Start a post</button>
                </FeedInput>
                <FeedInputOptions>
                    <InputOption Icon={ImageIcon} title="Photo" color="#378fe9" />
                    <InputOption Icon={YouTubeIcon} title="Video" color="#5f9b41" />
                    <InputOption Icon={EventNoteIcon} title="Event" color="#c37d16" />
                    <InputOption Icon={ViewDayIcon} title="Write Article" color="#e16745" />
                </FeedInputOptions>
            </FeedInputContainer>
            <Post userEmail={userEmail} />
            <PostModal userName={userName} userEmail={userEmail} userPhoto={userPhoto} showModal={showModal} clickHandler={clickHandler} />
        </Container>
    )
}

export default Main

const Container = styled.div`
    flex: 0.525;
    top: 80px;
`

const FeedInputContainer = styled.div`
    background-color: white;
    border-radius: 10px;
    height: fit-content;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
    padding: 15px 15px 5px 15px;
    margin: 0 20px;

    @media (max-width:768px) {
        margin: 0 0 10px 0;
    }
`

const FeedInput = styled.div`
    display: flex;
    align-items: center;

    button {
        padding: 10px 20px;
        margin-left: 10px;
        font-weight: 600;
        text-align: left;
        flex-grow: 1;
        height: 50px;
        border: 1px solid rgba(0, 0, 0, 0.3);
        border-radius: 30px;
        color: rgba(0, 0, 0, 0.6);
        background-color: white;
        cursor: pointer;

        &:hover {
            background-color: whitesmoke;
        }
    }
`

const ProfilePhoto = styled(Avatar)`
    object-fit: contain;
    height: 50px;
    width: 50px;
`

const FeedInputOptions = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-top: 5px;

    @media (max-width:768px) {
        justify-content: space-evenly;
    }
`