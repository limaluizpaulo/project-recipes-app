import React, { Component } from 'react';

export class teste extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dados: [
        { item: 'dadaada', qt: 0, check: false },
        { item: 'baa', qt: 0, check: false },
        { item: 'name', qt: 0, check: false },
        { item: 'eseses', qt: 0, check: false },
      ],
    };
    this.momo = this.momo.bind(this);
  }

  momo(e) {
    e.preventDefault();
    const { dados } = this.state;
    dados.find((dado) => {
      if (dado.item === 'name') {
        return dados.indexOf(dado);
      }
      this.setState({ dados: { ...dados, index: { ...dado, check: true } } });
      return null;
    });
  }

  render() {
    return (
      <div>
        <button type="button" onClick={ this.momo }>troca</button>
      </div>
    );
  }
}

export default treste;
