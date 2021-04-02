import {render, screen} from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import App from './App';
import SearchForm from '../Search';
import Button from '../Button';
import Objects from '../Objects';

// test('renders learn react link', () => {
//   render(<App/>);
//   const linkElement = screen.getByText('Title');
//   expect(linkElement).toBeInTheDocument();
// });

describe('App', () => {
  it('renders App component', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
  });
  
  test('snapshots for App component', () => {
    const component = renderer.create(<App/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('SearchForm', () => {
  const props = {
    title: 'Search',
    onChange: () => {
    },
    handleInput: () => {
    },
    handleSubmit: () => {
    },
    children: 'Next',
  };
  
  it('renders SearchForm component', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SearchForm {...props}>Search</SearchForm>, div);
  });
  
  test('snapshots for SearchForm component', () => {
    const component = renderer.create(<SearchForm {...props}>Search</SearchForm>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Button', () => {
  it('renders Button component', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button>More</Button>, div);
  });
  
  test('snapshots for Button component', () => {
    const component = renderer.create(<Button>Next</Button>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Objects', () => {
  const props = {
    items: [
      {title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y'},
      {title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z'},
    ],
    removeItem: () => {
    },
  };
  
  it('renders Objects component', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Objects {...props}/>, div);
  });
  
  test('snapshots for Object Component', () => {
    const component = renderer.create(<Objects {...props}/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  // it('should show two items in list', function () {
  //   const element = shallow(<Objects {...props}/>);
  //   expect(element.find('.table-row').length).toBe(2)
  // });
});