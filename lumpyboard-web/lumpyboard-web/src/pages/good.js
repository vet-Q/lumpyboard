import React from "react"
import { Slide } from '../components/slide';


export default function Home() {
    const thirdSlideTitle = 'ㅋㅋㅋ'
    return (
        <div>
            <h1>lumpyskin board</h1>
            <Slide title = '국가별 현황'>{thirdSlideTitle}</Slide>
        </div>
        );
};