import React from 'react';
import { css } from '@emotion/react';

// 증감량을 표시하는 함수, 숫자에 천 단위 구분 기호를 추가하여 표현하는 함수를 적용
import { formatDiff, numberWithCommas } from '../utils/formatter';

export function DashboardItem(props, div1 = div, div3 = div2) {
  const { text, current, prev, diffColor, unit } = props;
  //   diffcolor 속성이 존재하면 해당값을 출력하고, 없다면 red값을 사용함
  const finalDiffColor = diffColor ? diffColor : 'red';

  //   unit속성이 percent일 때는 소수점 두 자리수까지 표기하기
  const formattedNumber =
    unit === 'percent' ? `${current.toFixed(2)}%` : numberWithCommas(current);

  return (
    <div
      css={css`
        font-size: 15px;
        position: relative;
      `}
    >
      <p
        css={css`
          font-size: 22px;
          font-weight: 500;
          position: relative;
          //    화면 가로 길이가 576보다 작거나 같으면 폰트 크기를 더 작게 지정할 것
          @media (max-width: 576px) {
            font-size: 20px;
          }
        `}
      >
        {formattedNumber}
      </p>
      {/*  prev속성의 존재 여부에 따라 증감을 보여주는 엘리먼트를 보여줄지를 결정함*/}
      {prev ? (
        <p
          css={css`
            position: absolute;
            top: 24px;
            width: 100%;
            color: ${finalDiffColor};
          `}
        >
          {formatDiff(current, prev)}
        </p>
      ) : null}
      <p>{text}</p>
    </div>
  );
}
