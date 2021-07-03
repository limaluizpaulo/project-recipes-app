import React from 'react';
import { Container } from 'react-bootstrap';

export default function Title({ video }) {

  const generateEmbedCode = () => {
    if (video) {
      return video.split('=')[1];
    }
  }

  return (
    <Container>
      <h4>Vídeo</h4>
      {/* * SOURCE * https://www.w3schools.com/html/html_youtube.asp */}
      <div>
        <iframe
          data-testid="video"
          width="100%"
          title="Video"
          src={`https://www.youtube.com/embed/${generateEmbedCode()}?autoplay=1&mute=1`}>
        </iframe>
      </div>
      <br/>
    </Container>
  );
}
