import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --vh: 100%;
  background: ${({ theme }) => theme.colors.skyblue};;
  }
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
    font: inherit;
    font-family: "Noto Sans KR";
  }
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  *[hidden] {
      display: none;
  }
  body {
    display: block;
    touch-action: manipulation;
    line-height: 1;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote::before, blockquote::after,
  q::before, q::after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  
  /* 위에가 styled-reset 내용 */
  * {
    box-sizing: border-box;
  }
  html {
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color:rgb(0 0 0 / 0%);
    scroll-behavior: smooth;
    font-family: sans-serif;
    font-size: 62.5%;
    user-select: none;
  }
  ul, li {
    padding-left: 0;
    list-style: none;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input, button {
    outline: none;
    border: none;
    background-color: transparent;
  }
  button {
    cursor: pointer;
    padding: 0;
  }
  input {
    appearance: none;
    &:focus {
      outline: none;
    }
  }
`;