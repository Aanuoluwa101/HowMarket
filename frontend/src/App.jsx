import React, { Component } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import Store from "./store";
import Market from "./market";
import Ledgers from './ledgers';
import Register from './register';
import Login from './login';
import LandingPage from './landing';

export default class App extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route exact path="/" element={<LandingPage/>}/>
                    <Route exact path="/store" element={<Store/>}/>
                    <Route exact path="/ledgers" element={<Ledgers/>}/>
                    <Route exact path="/market" element={<Market/>}/>
                    <Route exact path="/register" element={<Register />}/>
                    <Route exact path="/login" element={<Login />}/>
                </Routes>
            </Router>
        )
    }
}