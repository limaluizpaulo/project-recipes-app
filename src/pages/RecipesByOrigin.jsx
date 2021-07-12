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

  render() {
    const areas = this.state;
    const something = areas;
    console.log(areas);
    console.log(something[0]);
    const options = [
      {
        type: 'group',
        name: 'group1',
        items: [
        ],
      },
      {
        type: 'group',
        name: 'group2',
        items: [
          { value: 'five', label: 'Five' },
          { value: 'six', label: 'Six' },
        ],
      },
    ];
    console.log(options);

    return (
      <div>
        <Header header="Explorar Origem" explorer />
        <div data-testid="explore-by-area-dropdown">
          <Dropdown
            options={ something }
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
