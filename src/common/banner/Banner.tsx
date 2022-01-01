import React, { ReactElement } from 'react';
import 'antd/dist/antd.css';
import { Carousel } from 'antd';

import banner1 from '../../assets/images/banner1.jpg';
import banner2 from '../../assets/images/banner2.jpg';

const contentStyle1: React.CSSProperties = {
  height: '400px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  backgroundImage: `url(${banner1})`,
};
const contentStyle2: React.CSSProperties = {
  height: '400px',
  color: '#fff',
  lineHeight: '160px',
  backgroundImage: `url(${banner2})`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

interface Props {}

export default function Banner(props: Props): ReactElement {
  return (
    <div className="banner">
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle1}>
            <span
              style={{
                fontSize: '50px',
                color: 'rgba(255,255,255,0.3)',
                margin: 'auto',
              }}
            >
              Your Fashion-Your Life
            </span>
          </h3>
        </div>
        <div>
          <h3 style={contentStyle2}> </h3>
        </div>
      </Carousel>
    </div>
  );
}
