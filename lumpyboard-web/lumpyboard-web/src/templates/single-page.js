import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { css } from '@emotion/react';

export default function SinglePage ({pageContext}) {
    // pageContext를 통해 전달된 데이터를 추출하여 사용
    const { dataSource } = pageContext;
    const { lastUpdate ,globalStats } = dataSource;

    // 사용자의 언어/지역 설정에 맞는 날짜 형태로 표시
    const lastUpdatedFormatted = new Date(lastUpdate).toLocaleString()

    console.log(`this is ${lastUpdate}`);
    console.log(globalStats);
    return (
        < div id="top">
          <div
            css={css`
              position:absolute;;
              background-color: black;
              width:100%;
              height:300px;
              //what is z-index??
              z-index:-99;
            `}
          />
        <h1
          css={css`
          padding-top: 48px;
          padding-bottom: 24px;
          color:white;
          text-align:center;
          font-size:28px;
          `}
          >
          럼피스킨병(Lumpy Skin disease)
          <br/>
          Dashboard
        </h1>
        {/*      마지막 업데이트 정보 표시 */}
        <p className="text-center text-white">
          마지막 업데이트:{lastUpdatedFormatted}
        </p>
    </div>
    );
}
