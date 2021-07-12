import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';

class RecipesByOrigin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areas: [],
    };
    this.getLocation = this.getLocation.bind(this);
  }

  componentDidMount() {
    this.getLocation();
  }

  async getLocation() {
    const result = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const { meals } = await result.json();
    this.setState({ areas: meals });
  }

  // mappingAreas() {
  //   areas
  // }

  render() {
    const { areas } = this.state;
    const something = (areas);
    // console.log(Object.keys(areas).map(...areas));
    console.log(areas);
    console.log(something);
    // if (areas<1)
    const options = [
      { ...something },
      {
        type: 'group',
        name: 'group1',
        items: [
          { value: 'three', label: 'Three', className: 'myOptionClassName' },
          { value: 'four', label: 'Four' },
        ],
      },
    ];
    console.log(options);

    return (
      <div>
        <Header header="Explorar Origem" explorer />
        <div data-testid="explore-by-area-dropdown">
          <Dropdown
            options={ Object.keys(...options) }
            placeholder="select something"
          />
        </div>
        <h2> presunto</h2>
        <DownMenu />
      </div>
    );
  }
}

export default RecipesByOrigin;
