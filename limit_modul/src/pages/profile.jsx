import '../App.css'
import React, {useState, useEffect} from 'react';

import {observer} from 'mobx-react-lite'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Profile from './profile_page'
// import { store } from '../store';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function CardProfile(User) {
  return (
    <Card>
      <Card.Header as="h5">{User['login']}</Card.Header>
      <Card.Body>
        <Card.Title>Email: {User['email']}</Card.Title>
        <Card.Text>
          {User['status']}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardProfile;