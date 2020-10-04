import React from 'react';
import {Link} from 'react-router-dom'
import './App.css';
import {Menu, Icon} from 'antd'

function Nav() {

  return (
    <nav >
      <Menu style={{textAlign: 'center'}} mode="horizontal" theme="dark">

        <Menu.Item key="mail">
          <Link to="/screensource">
            <Icon type="home" />
            Sources
          </Link>
        </Menu.Item>

        <Menu.Item key="test">
          <Link to="/screenmyarticles">
            <Icon type="read" />
            Favoris
          </Link>
        </Menu.Item>

        <Menu.Item key="app">
          <Link to="/">
            <Icon type="logout" />
            Déconnexion
          </Link>
        </Menu.Item>

      </Menu>
    </nav>
  );
}

export default Nav;
