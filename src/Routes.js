import React from 'react';
import { Route, Routes as RouterRoutes } from 'react-router-dom';

import {HomePage} from './pages/Home';
import {AboutUsPage} from './pages/AboutUs';
import {CatalogPage} from './pages/Catalog';
import {OrderPage} from './pages/Order';
import {ProfilePage} from './pages/Profile';
import {SignInPage} from './pages/SignIn';
import {SignUpPage} from './pages/SignUp';
import {TarifPage} from './pages/Tarif';
import AdminPanel from './pages/AdminPanel';

const Routes = () => {
    return (
        <RouterRoutes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/AboutUs" element={<AboutUsPage/>} />
            <Route path="/Catalog" element={<CatalogPage/>} />
            <Route path="/Order" element={<OrderPage/>} />
            <Route path="/Profile" element={<ProfilePage/>} />
            <Route path="/SignIn" element={<SignInPage/>} />
            <Route path="/SignUp" element={<SignUpPage/>} />
            <Route path="/Tarif" element={<TarifPage/>}/>
            <Route path="/AdminPanel" element={<AdminPanel/>}/>
        </RouterRoutes>
    );
};

export default Routes;