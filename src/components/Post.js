import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled/macro'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import ShareIcon from '@mui/icons-material/Share'
import SendIcon from '@mui/icons-material/Send'
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import ReactPlayer from 'react-player'
import db from '../firebase'
import { onSnapshot, collection, query, orderBy, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { storage } from '../firebase'
import { ref, getDownloadURL, deleteObject } from "firebase/storage";

function Post({ userEmail }) {
    const [posts, setPosts] = useState([]);
    const [postImgUrls, setPostImgUrls] = useState([]);

    const socialOptions = (Icon, title, color, whoLiked, id, likesCount, userEmail) => {
        return (
            <SocialItem onClick={(e) => likeHandler(e, title, whoLiked, id, likesCount, userEmail)} status={whoLiked && whoLiked.includes(userEmail)}>
                {Icon && <Icon />}
                <h4>{title}</h4>
            </SocialItem>
        )
    }

    useEffect(() => {
        const q = query(collection(db, "posts"), orderBy("date", "desc"))
        onSnapshot(q, (querySnapshot) => {
            setPosts(
                querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )
            querySnapshot.docs.forEach((doc) => {
                doc.data().sharedImg &&
                getDownloadURL(ref(storage, doc.data().sharedImg)).then((url) => {
                    setPostImgUrls(prev => [...prev, {
                        id: doc.id,
                        sharedPostImg: url
                    }])
                })
            })
        });
    }, []);

    const likeHandler = (e, title, whoLiked, id, likesCount, userEmail) => {
        if (title === "Like") {
            if (!whoLiked.includes(userEmail)) {
                updateDoc(doc(db, "posts", id), {
                    likes: likesCount + 1,
                    whoLiked: [...whoLiked, userEmail]
                });
            } else {
                updateDoc(doc(db, "posts", id), {
                    likes: likesCount - 1,
                    whoLiked: whoLiked.filter(function(item) {
                        return item !== userEmail
                    })
                });
            }
        } else {
            return
        }
    }

    const deletePost = (e, id, sharedImg) => {
        deleteDoc(doc(db, "posts", id));
        deleteObject(ref(storage, sharedImg)).then(() => {
            console.log('Deleted image!');
        });
    }

    return (
        <>
            {posts.length > 0 ? (posts.map(({ id, data: { author, date, description, email, likes, profilePhoto, sharedImg, sharedVideo, whoLiked } }) => (
                <Container key={id}>
                    <SharedActor>
                        <PostAuthorInfo>
                            <Avatar style={{ width:"60px", height:"60px", objectFit:"contain" }} src={profilePhoto} />
                            <div>
                                <span>{author}</span>
                                <span>{email}</span>
                                <span>{date && date.toDate().toLocaleString()}</span>
                            </div>
                        </PostAuthorInfo>
                        <DeletePostWrap>
                            <IconButton>
                                <MoreHorizIcon />
                            </IconButton>
                            { (userEmail === email) &&
                                <DeletePost onClick={(e) => deletePost(e, id, sharedImg)}><DeleteIcon style={{ fontSize: "16px" }} /> Delete</DeletePost>
                            }
                        </DeletePostWrap>
                    </SharedActor>
                    <Description>{description}</Description>
                    <SharedImage>
                        {sharedImg ? (
                            postImgUrls.length > 0 && postImgUrls.find(url => url.id === id) &&
                            <img src={postImgUrls.find(url => url.id === id).sharedPostImg} alt="" />
                        ) : (
                            sharedVideo && <ReactPlayer width={"100%"} url={sharedVideo} controls={true} />
                        )}
                    </SharedImage>
                    <SocialCount>
                        <>
                            <li>
                                <Liked></Liked>
                            </li>
                            <li>
                                <span>{likes}</span>
                            </li>
                            <li style={{ marginLeft: "auto" }}>
                                <span style={{ color: "#0a66c2" }}>0 comments</span>
                            </li>
                        </>
                    </SocialCount>
                    <SocialActions>
                        {socialOptions(ThumbUpOffAltIcon, "Like", "rgba(0, 0, 0, 0.6)", whoLiked, id, likes, userEmail)}
                        {socialOptions(ChatOutlinedIcon, "Comment", "rgba(0, 0, 0, 0.6)")}
                        {socialOptions(ShareIcon, "Share", "rgba(0, 0, 0, 0.6)")}
                        {socialOptions(SendIcon, "Send", "rgba(0, 0, 0, 0.6)")}
                    </SocialActions>
                </Container>
            ))) : (
                <ProgressContainer>
                    <CircularProgress />
                </ProgressContainer>
            )}
        </>
    )
}

export default Post

const Container = styled.div`
    background-color: white;
    border-radius: 10px;
    height: fit-content;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
    padding: 15px 15px 0 15px;
    margin: 15px;

    @media (max-width:768px) {
        margin: 15px 0;
    }
`

const ProgressContainer = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 15px;

    @media (max-width:768px) {
        padding-top: 0;
        padding-bottom: 15px;
    }
`

const SharedActor = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
`

const PostAuthorInfo = styled.div`
    display: flex;
    align-items: center;
    div {
        display: flex;
        flex-direction: column;
        span {
            font-size: 13px;
            padding: 1px 5px;
        }
    }
`

const DeletePost = styled.div`
    position: absolute;
    top: 40px;
    right: -15px;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 0 0 5px 5px;
    padding: 10px 20px;
    font-size: 13px;
    font-weight: 600;
    display: none;
    color: #dc3545;
    cursor: pointer;
    z-index: 555;
`

const DeletePostWrap = styled.div`
    position: relative;
    &:hover ${DeletePost}, &:active ${DeletePost} {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

const Description = styled.p`
    margin: 10px 0;
    font-size: 14px;
`

const SharedImage = styled.div`
    img {
        width: 100%;
    }
`

const SocialCount = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e9efdf;
    list-style: none;
    padding: 7.5px 0;
    li {
        margin-right: 5px;
        font-size: 12px;
    }
`

const Liked = styled(ThumbUpIcon)`
    font-size: 14px;
    color: #0a66c2;
    margin-bottom: -2px;

    @media (max-width:768px) {
        font-size: 12px;
    }
`

const SocialActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 5px 0;
`

const SocialItem = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 15px;
    color: ${(props) => (props.status ? "#0a66c2" : "rgba(0, 0, 0, 0.6)")};
    cursor: pointer;
    white-space: nowrap;

    @media (max-width:768px) {
        padding: 7.5px;
    }

    h4 {
        font-size: 14px;
        margin-left: 10px;

        @media (max-width:768px) {
            font-size: 12px;
        }
    }

    &:hover {
        background-color: whitesmoke;
        border-radius: 5px;
    }
`