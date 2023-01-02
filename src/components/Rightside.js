import React from 'react'
import styled from '@emotion/styled'
import InfoIcon from '@mui/icons-material/Info';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

function Rightside() {
    const newsArticle = (heading, subtitle) => {
        return (
            <WidgetsArticle>
                <WidgetsArticleLeft>
                    <BulletPoint />
                </WidgetsArticleLeft>
                <WidgetsArticleRight>
                    <h4>{heading}</h4>
                    <p>{subtitle}</p>
                </WidgetsArticleRight>
            </WidgetsArticle>
        )
    }

    return (
        <Container>
            <WidgetsHeader>
                <h2>LinkedIn News</h2>
                <Info />
            </WidgetsHeader>
            {newsArticle('Elon Musk sells almost $4bn of Tesla shares','Elon Musk sells almost $4bn of Tesla shares')}
            {newsArticle('Elon Musk takes control of Twitter in $44bn deal','Elon Musk takes control of Twitter in $44bn deal')}
            {newsArticle('Dogecoin (DOGE) soars after Elon Musk hints at Twitter 2.0','Dogecoin (DOGE) soars after Elon Musk hints at Twitter 2.0')}
            {newsArticle('Elon Musk Wants to Test Brain Implants in People','Elon Musk Wants to Test Brain Implants in People')}
            {newsArticle('SpaceX Starship Super Heavy booster test-fires record 14 engines','SpaceX Starship Super Heavy booster test-fires record 14 engines')}
        </Container>
    )
}

export default Rightside

const Container = styled.div`
    flex: 0.25;
    position: sticky;
    top: 60px;
    background-color: white;
    border-radius: 10px;
    height: fit-content;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
    padding: 15px 0px;

    @media (max-width:768px) {
        position: initial;
    }
`

const WidgetsHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px 10px 10px;

    h2 {
        font-size: 16px;
        font-weight: 600;
    }
`

const Info = styled(InfoIcon)`
    font-size: 18px;
`

const WidgetsArticle = styled.div`
    display: flex;
    padding: 10px;
    cursor: pointer;

    &:hover {
        background-color: whitesmoke;
        color: black;
    }
`

const BulletPoint = styled(FiberManualRecordIcon)`
    font-size: 12px;
    color: #0a66c2;
`

const WidgetsArticleLeft = styled.div`
    padding-right: 5px;
`

const WidgetsArticleRight = styled.div`
    h4 {
        font-size: 14px;
    }
    p {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.6);
    }
`