import React from 'react';
import App from './App';
import Home from './Components/Home/Home';
import Details from './Components/Details/Details';
import { shallow } from 'enzyme';

describe("rendering components", () => {
  it("renders App component without crashing", () => {
    shallow(<App />)
  });

  it("renders Home component without crashing", () => {
    shallow(<Home />)
  });

  it("renders Home component header without crashing", () => {
    const wrapper = shallow(<Home />);
    const header = (<h1 style={{"textAlign": "center"}}>Post list</h1>);
    expect(wrapper.contains(header)).toEqual(true);
  });

  it("renders CountryInfo component without crashing", () => {
    shallow(<Details />)
  });
})
