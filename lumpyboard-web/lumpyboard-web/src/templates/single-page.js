import React from 'react';

import { Slide } from '../components/slide';

export default function SinglePage ({pageContext}) {
    const { dataSource } = pageContext;
    const { globalStats } = dataSource;
    const title2 = 'good'
    console.log(globalStats);
    return (
        <div>
            <Slide>
              <h1>Lumpyskin disease board</h1>
              <p>made by create Page</p>
            </Slide>
          
            <Slide title={title2}>Hello world</Slide>
        </div>
    )
}