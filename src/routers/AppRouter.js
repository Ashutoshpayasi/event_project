import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../components/SigningComponents/Home'
import Header from '../Headers/Header';
import VendorProposals from '../components/vendor/VendorProposals';
import AllProposals from '../components/user/AllProposals';
import SingleProposal from '../components/user/SingleProposal';
import Createproposal from '../components/vendor/Createproposal';
import Reset from '../components/SigningComponents/Reset';
import Profile from '../Headers/Profile';


function AppRouter() {
  return <BrowserRouter>
    <Routes>
      {/* <Route path="*" element={<h1>404 PAGE NOT FOUND!</h1>} /> */}
      <Route path='/' element={<Home />} />
      <Route path='/user' element= {<Header/>}>
        <Route path='proposals' element = {<AllProposals/>}/>
        <Route path='proposals/:id' element = {<SingleProposal/>}/>
      </Route>
      <Route path='/vendor' element = {<Header />}>
        <Route path='proposals' element = {<VendorProposals/>}/>
      </Route>
      <Route path='/reset' element={<Reset/>}/>
    </Routes>
  </BrowserRouter>
}

export default AppRouter