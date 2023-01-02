import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth, provider } from '../firebase'
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { setUserLogin } from '../features/user/userSlice'

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUserLogin({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }))
                navigate("/home");
            }
        });
    }, [dispatch, navigate]);

    const signIn = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            let user = result.user;
            dispatch(setUserLogin({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            }))
            navigate("/home");
        })
    }

    return (
        <Container>
            <Nav>
                <a href = "/">
                    <img src = "images/login-logo.svg" alt="" />
                </a>
                <div>
                    <Join>Join now</Join>
                    <SignIn onClick={signIn}>Sign in</SignIn>
                </div>
            </Nav>
            <Section>
                <Hero>
                    <h1>Welcome to your professional community</h1>
                    <img src="/images/login-hero.svg" alt="" />
                </Hero>
                <Form>
                    <Google onClick={signIn}>
                        <img src="/images/google.svg" alt="" />
                        Sign in with Google
                    </Google>
                </Form>
            </Section>
        </Container>
    )
}

export default Login

const Container = styled.div``

const Nav = styled.div`
    max-width: 1128px;
    margin: auto;
    padding: 10px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    a {
        width: 135px;
        height: 35px;
    }
`

const Join = styled.a`
    font-size: 16px;
    padding: 10px 10px;
    color: rgba(0, 0, 0, 0.6);
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
    &:hover {
        background-color: rgba(0, 0, 0, 0.08);
        color: rgba(0, 0, 0, 0.9);
    }
`

const SignIn = styled.a`
    box-shadow: inset 0 0 0 1px #0a66c2;
    color: #0a66c2;
    border-radius: 25px;
    transition-duration: 175ms;
    font-size: 16px;
    font-weight: 600;
    padding: 10px 20px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0);
    cursor: pointer;
    &:hover {
        background-color: rgba(112, 181, 249, 0.15);
    }
`

const Section = styled.section`
    max-width: 1128px;
    margin: auto;
    padding: 60px 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`

const Hero = styled.div`
    width: 100%;
    h1 {
        width: 55%;
        font-size: 56px;
        color: #2977c9;
        font-weight: 200;
        @media (max-width: 768px) {
            text-align: center;
            font-size: 20px;
            width: 100%;
            padding-bottom: 10px;
        }
    }
    img {
        width: 700px;
        height: 700px;
        position: fixed;
        top: 90px;
        right: -150px;
        @media (max-width: 768px) {
            position: initial;
            width: 100%;
            height: 100%;
        }
    }
`;

const Form = styled.div`
    margin-top: 100px;
    width: 408px;
    @media (max-width: 768px) {
        margin-top: 20px;
        width: 100%;
    }
`;

const Google = styled.button`
    display: flex;
    justify-content: center;
    background-color: #fff;
    align-items: center;
    height: 56px;
    width: 100%;
    border-radius: 28px;
    transition-duration: 175ms;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.6);
    cursor: pointer;
    &:hover {
        background-color: rgba(207, 207, 207, 0.25);
        color: rgba(0, 0, 0, 0.75);
    }
`;