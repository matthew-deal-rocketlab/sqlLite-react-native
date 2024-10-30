import React, {useEffect, useState} from 'react';

// import * as Svgimages from '../../components/a_svg';
import {SplashPageLogo, SplashPageText, SplashPageWrapper} from './styles';

export const SplashPage = () => {
  const [splashQuote, setSplashQuote] = useState('Loading ...');

  useEffect(() => {
    setTimeout(() => setSplashQuote('Ready!'), 600);
  }, []);

  return (
    <SplashPageWrapper>
      <SplashPageLogo source={require('../../assets/png/rl_logo.jpg')} />
      {/* <Svgimages.Tux fill="black" width={100} height={100} /> */}
      <SplashPageText>{splashQuote}</SplashPageText>
    </SplashPageWrapper>
  );
};
