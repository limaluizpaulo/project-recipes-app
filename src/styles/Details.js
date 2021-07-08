import styled from 'styled-components';

export const PageDetails = styled.main`background: #eea371;
  color: black;
  display: flex;
  flex-direction: column;
`;

export const Thumb = styled.img`height: 60vh;
  object-fit: cover;
  width: 100vw;
`;

export const Popup = styled.div`background: #f93602;
  border-radius: 10px;
  display: flex;
  height: 40px;
  opacity: ${(props) => (props.copied ? '' : 0)};
  position: absolute;
  right: 5vw;
  text-align: center;
  top: 5vh;
  transition: ${(props) => (props.copied ? 'all 250ms linear' : 'all 250ms linear 2s')};
  width: 60px;
`;

export const Header = styled.section`background: #f93602;
  border-radius: 0 0 20px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-width: 100vw;

  section {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    width: 100vw;

    div {
      display: flex;
      flex-direction: column;
      max-height: 20vh;
      padding: 10px;
      width: 75vw;

      h1 {
        box-sizing: border-box;
        color: black;
        font-size: 1.5rem;
        font-weight: 700;
        padding: 0;
      }

      h2 {
        color: rgb(97, 93, 93);
        font-size: 20px;
        font-weight: 400;
        padding: 0;
      }
    }

    section {
      display: flex;
      height: 50px;
      justify-content: space-evenly;
      padding: 5px;
      width: 25vw;

      button {
        background: transparent;
        border: none;
        height: 35px;
        width: 45;
      }
    }
  }
`;

export const Ingredients = styled.section`background: transparent;

  h1 {
    font-size: 2rem;
    font-weight: 600;
    padding: 5px 10px;
  }

  ul {
    background: #dc3545;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 500;
  }
`;

export const Instructions = styled.section`background: transparent;

  h1 {
    font-size: 2rem;
    font-weight: 600;
    padding: 5px 10px;
  }

  div {
    background: #dc3545;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 500;
    margin: 0 10px;
    padding: 5px 10px;
    text-align: justify;
  }
`;

export const VideoRecipe = styled.section`background: transparent;

  h1 {
    font-size: 2rem;
    font-weight: 600;
    padding: 0 10px;
  }

  div {
    align-items: center;
    display: flex;
    justify-content: center;
    width: 100vw;

    iframe {
      border-radius: 10px;
      height: 35vh;
      width: 87%;
    }
  }
`;
