import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import Header from '../components/Header';
import ButtonCompartilhar from '../components/ButtonCompartilhar';
import BotaoFavorito from '../components/ReceitaEmProgresso/BotaoFavorito';
import { getItemLocalStorage } from '../services/localStorage';

export default function ReceitasFeitas() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [receitas, setReceitas] = useState([]);
  const [tipoFiltro, setTipoFiltro] = useState('All');
  const [renderCard, setRenderCard] = useState(false);
  const filterCategory = () => (tipoFiltro !== 'All' ? receitas
    .filter((receita) => tipoFiltro === receita.type) : receitas);

  const redirecionaDetalhesReceita = (type, id) => {
    history.push(`/${type}s/${id}`);
  };

  useEffect(() => {
    setReceitas(pathname === '/receitas-feitas'
      ? getItemLocalStorage('doneRecipes') : getItemLocalStorage('favoriteRecipes'));
  }, [pathname, renderCard]);

  const renderCards = (receita, index) => {
    const {
      image, category, name, doneDate, tags, id, type, area, alcoholicOrNot } = receita;
    if (type === 'comida') {
      return (
        <Col key={ id }>
          <Card>
            <Card.Img
              variant="top"
              src={ image }
              data-testid={ `${index}-horizontal-image` }
              onClick={ () => redirecionaDetalhesReceita(type, id) }
            />
            <Card.Body>
              <span
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${area} - ${category}`}
              </span>
              <ButtonCompartilhar
                parametrosURL={ { id, type } }
                dataTestId={ `${index}-horizontal-share-btn` }
              />
              <BotaoFavorito
                receita={ receita }
                dataTestId={ `${index}-horizontal-favorite-btn` }
                onClick={ () => setRenderCard(!renderCard) }
              />
              <Card.Title
                onClick={ () => redirecionaDetalhesReceita(type, id) }
                data-testid={ `${index}-horizontal-name` }
              >
                {name}
              </Card.Title>
              <Card.Text
                data-testid={ `${index}-horizontal-done-date` }
              >
                {doneDate}
              </Card.Text>
              { pathname === '/receitas-feitas'
                ? tags.map((tagName, i) => (
                  <Card.Link
                    key={ i }
                    href="#"
                    data-testid={ `${index}-${tagName}-horizontal-tag` }
                  >
                    {tagName}
                  </Card.Link>
                )) : null}
            </Card.Body>
          </Card>
        </Col>
      );
    }
    return (
      <Col key={ id }>
        <Card>
          <Card.Img
            variant="top"
            src={ image }
            data-testid={ `${index}-horizontal-image` }
            onClick={ () => redirecionaDetalhesReceita(type, id) }
          />
          <Card.Body>
            <span data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</span>
            <ButtonCompartilhar
              parametrosURL={ { id, type } }
              dataTestId={ `${index}-horizontal-share-btn` }
            />
            <BotaoFavorito
              receita={ receita }
              dataTestId={ `${index}-horizontal-favorite-btn` }
              onClick={ () => setRenderCard(!renderCard) }
            />
            <Card.Title
              data-testid={ `${index}-horizontal-name` }
              onClick={ () => redirecionaDetalhesReceita(type, id) }
            >
              {name}
            </Card.Title>
            <Card.Text
              data-testid={ `${index}-horizontal-done-date` }
            >
              {doneDate}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <Container>
      <Header />
      <aside>
        <Button
          variant="outline-danger"
          size="sm"
          data-testid="filter-by-all-btn"
          onClick={ () => setTipoFiltro('All') }
        >
          All
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          data-testid="filter-by-food-btn"
          onClick={ () => { setTipoFiltro('comida'); } }
        >
          Food
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          data-testid="filter-by-drink-btn"
          onClick={ () => setTipoFiltro('bebida') }
        >
          Drinks
        </Button>
      </aside>
      <Row>
        {filterCategory().map((receita, index) => (
          renderCards(receita, index)
        ))}
      </Row>
    </Container>
  );
}
