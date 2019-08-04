import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Link } from "react-router-dom";
import {BaseStyles, Heading, UnderlineNav, Text} from '@primer/components';
import logo from './logo.svg';
import './App.css';

function Index() {
  return <Heading>Home</Heading>;
}

function About() {
  return <Heading>About</Heading>;
}

function Users() {
  return <Heading>Users</Heading>;
}

function App() {
  return (
    <Router>
      <BaseStyles>
        <Heading>
          <Text fontFamily="mono">Sync</Text>
        </Heading>
        <UnderlineNav aria-label="Main">
          <UnderlineNav.Link to="/" exact as={NavLink}>Home</UnderlineNav.Link>
          <UnderlineNav.Link to="/about/" as={NavLink}>About</UnderlineNav.Link>
          <UnderlineNav.Link to="/users/" as={NavLink}>Users</UnderlineNav.Link>
        </UnderlineNav>

        <Route path="/" exact component={Index} />
        <Route path="/about/" component={About} />
        <Route path="/users/" component={Users} />
      </BaseStyles>
    </Router>
  );
}

export default App;
