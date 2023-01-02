import React, { useState } from 'react'
import styled from '@emotion/styled'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import ImageIcon from '@mui/icons-material/Image'
import YouTubeIcon from '@mui/icons-material/YouTube'
import ChatIcon from '@mui/icons-material/Chat'
import ReactPlayer from 'react-player'
import db from '../firebase'
import { collection, addDoc } from "firebase/firestore"
import { serverTimestamp } from "firebase/firestore";
import { storage } from '../firebase'
import { ref, uploadBytes } from "firebase/storage";

function PostModal({userName, userEmail, userPhoto, showModal, clickHandler}) {
    const [editorText, setEditorText] = useState("");
	const [imageFile, setImageFile] = useState("");
	const [videoFile, setVideoFile] = useState("");
	const [assetArea, setAssetArea] = useState("");

    const reset = (event) => {
        setEditorText("");
        setImageFile("");
        setVideoFile("");
        setAssetArea("");
        clickHandler(event);
    };

    const handleImage = (event) => {
        let image = event.target.files[0];

        if (image === "" || image === undefined) {
            alert(`Not an image. This file is: ${typeof imageFile}`);
            return;
        }
        setImageFile(image);
    }

    const switchAssetArea = (area) => {
		setImageFile("");
		setVideoFile("");
		setAssetArea(area);
	}

    const sendPost = (event) => {
        addDoc(collection(db, "posts"), {
            author: userName,
            date: serverTimestamp(),
            description: editorText,
            email: userEmail,
            likes: 0,
            profilePhoto: userPhoto,
            sharedImg: `images/${imageFile.name}`,
            sharedVideo: videoFile,
            whoLiked: []
        });
        const storageRef = ref(storage, `images/${imageFile.name}`);
        uploadBytes(storageRef, imageFile).then((snapshot) => {
            console.log('Uploaded image!');
        });
        reset(event);
    }

    return (
        <>
            { showModal === "open" &&
            <Container>
                <Content>
                    <Header>
                        <h2>Create a post</h2>
                        <IconButton onClick={(e) => reset(e)}>
                            <CloseButton></CloseButton>
                        </IconButton>
                    </Header>
                    <SharedContent>
                        <UserInfo>
                            <ProfilePhoto src={userPhoto} />
                            <span>{userName}</span>
                        </UserInfo>
                        <Editor>
                            <textarea value={editorText} onChange={(e) => setEditorText(e.target.value)} placeholder="What do you want to talk about?" autoFocus={true} ></textarea>
                            {assetArea === "image" ? (
                            <UploadImage>
                                <input type="file" accept="image/gif, image/jpeg, image/png" name="image" id="imageFile" onChange={handleImage} style={{ display: "none" }} />
                                <p style={{ padding: "10px 0" }}>
                                    <label htmlFor="imageFile" style={{ cursor: "pointer" }}>Select an image to share</label>
                                </p>
                                {imageFile && <img src={URL.createObjectURL(imageFile)} alt="" />}
                            </UploadImage>
                            ) : (
                                assetArea === "video" && (
                                <>
                                    <input
                                        type="text"
                                        name="video"
                                        id="videoFile"
                                        value={videoFile}
                                        placeholder="Enter the video link"
                                        onChange={(event) => setVideoFile(event.target.value)}
                                        style={{ marginTop: "10px", paddingLeft: "10px", boxSizing:"border-box" }}
                                    />
                                    {videoFile && <ReactPlayer width={"100%"} url={videoFile} controls={true} />}
                                </>
                                )
                            )}
                        </Editor>
                    </SharedContent>
                    <ShareCreation>
                        <AttachAsset>
                            <IconButton onClick={() => switchAssetArea("image")}>
                                <ImageAssetButton></ImageAssetButton>
                            </IconButton>
                            <IconButton onClick={() => switchAssetArea("video")}>
                                <VideoAssetButton></VideoAssetButton>
                            </IconButton>
                        </AttachAsset>
                        <ShareComment>
                            <CommentAssetButton></CommentAssetButton>
                            <span>Anyone</span>
                        </ShareComment>
                        <PostButton disabled={ !editorText ? true : false } onClick={(e) => sendPost(e)}>
                            Post
                        </PostButton>
                    </ShareCreation>
                </Content>
            </Container>
            }
        </>
    )
}

export default PostModal

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    color: black;
    background-color: rgba(0, 0, 0, 0.8);
`

const Content = styled.div`
    max-width: 552px;
    background-color: white;
    max-height: 90%;
    border-radius: 5px;
    position: relative;
    display: flex;
	flex-direction: column;
    top: 32px;
	margin: 0 auto;

    @media (max-width:768px) {
        width: 95%;
    }
`

const Header = styled.div`
	padding: 15px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.15);
	font-size: 14px;
	color: rgba(0, 0, 0, 0.6);
	display: flex;
	justify-content: space-between;
	align-items: center;
	h2 {
		font-weight: 400;
	}
`

const CloseButton = styled(CloseIcon)`
    cursor: pointer;
    color: rgba(0, 0, 0, 0.6);
    font-size: 20px;
    pointer-events: none;
`

const SharedContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    background: transparent;
    padding: 15px 15px 0 15px;
`

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    span {
        font-weight: 600;
        font-size: 16px;
        margin-left: 10px;
    }
`

const ProfilePhoto = styled(Avatar)`
    width: 50px;
    height: 50px;
`

const Editor = styled.div`
    padding-top: 15px;
    textarea {
        width: 100%;
		box-sizing:"border-box";
		min-height: 100px;
		resize: none;
        outline: none;
        border: none;
	}
	input {
		width: 100%;
		height: 35px;
		font-size: 16px;
		margin-bottom: 20px;
	}
`

const UploadImage = styled.div`
	text-align: center;
	img {
		width: 100%;
	}
`;

const ShareCreation = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const AttachAsset = styled.div`
    display: flex;
    align-items: center;
    padding: 15px 5px 15px 10px;
`

const ImageAssetButton = styled(ImageIcon)`
    color: rgba(0, 0, 0, 0.6);
    font-size: 25px;
    cursor: pointer;
    pointer-events: none;
`

const VideoAssetButton = styled(YouTubeIcon)`
    color: rgba(0, 0, 0, 0.6);
    font-size: 30px;
    cursor: pointer;
    pointer-events: none;
`

const ShareComment = styled.div`
    display: flex;
    align-items: center;
    margin-right: auto;
    cursor: pointer;
    border-left: 1px solid rgba(0, 0, 0, 0.2);
    padding: 15px 15px 15px 15px;
    span {
        font-size: 14px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.6);
        padding: 0 5px;
    }
`

const CommentAssetButton = styled(ChatIcon)`
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: -2px;
`

const PostButton = styled.button`
    margin: 15px 15px 15px 0;
	padding: 10px 15px;
	border-radius: 20px;
	background: ${(props) => (props.disabled ? "rgba(0, 0, 0, 0.4)" : "#0a66c2")};
	color: #fff;
	font-size: 14px;
	border: none;
	outline: none;
    cursor: pointer;
    &:hover {
		background: ${(props) => (props.disabled ? "rgba(0, 0, 0, 0.4)" : "#004182")};
	}
`