import React from 'react';
import notFound from '../images/notfound.gif';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <>
      <Header title="Explorar Origem" />
      <section className="transparent center">
        <h1>Not Found</h1>
        <img src={ notFound } alt="Not Found" />
      </section>
      <Footer className="explorar" />
    </>
  );
}
