import {Routes,Route} from 'react-router-dom';
import React from 'react';
import Signin from '../pages/signin';
import Signup from '../pages/signup';
import Dashboard from '../pages/dashboard/index';
import Dashboard2 from '../pages/dashboard2/index';
import RouteWrapper from './route';
export default function Routesa(){
    return (
        <Routes >
     <Route element={<RouteWrapper/>} >
            <Route path="/" element={<Signin/>} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route element={<RouteWrapper isPrivate />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard2" element={<Dashboard2 />} />
          </Route> 
        </Routes>
      );
}