import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import FirstTimePage from './pages';
import Welcome from './pages/welcome';
import DashboardHome from './pages/dashboard';
import Register from './pages/account/register';
import Login from './pages/account/login';
import ForgetEmail from './pages/account/forget-email';
import Cart from './pages/cart';
import StepComponent from './pages/account/steps';
import AddProducts from './pages/user/add-products';
import Profile from './pages/user/profile';
import ProductsSearch from './pages/user/products-search';
import StockisteSearch from './pages/user/stockists-search';
import ProductDetails from './pages/user/product-details';
import ConfirmCode from './pages/account/confirm-code';
import ResendCode from './pages/account/resend-code';
import GestionStock from './pages/dashboard/gestion-stock';
import ApparenceThemes from './pages/dashboard/apparence-themes';
import Docs from './pages/dashboard/docs';
import Notifications from './pages/dashboard/notifications';
import { isAuthenticated } from './api/auth-provider';
import DashboardSettings from './pages/dashboard/settings/Settings';
import SuccessPage from './views/success/Success';
import Messages from './pages/dashboard/messages';
import UserDashboardSettings from './pages/user/user-setting';
import NewDetail from './pages/new';

function App() {
  const [showFirstTimePage, setShowFirstTimePage] = useState(false);

  useEffect(() => {
    const hasVisited = Cookies.get('hasVisited');
    if (!hasVisited) {
      setShowFirstTimePage(true);
      Cookies.set('hasVisited', 'true', { expires: 365 });
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* {showFirstTimePage ? ( */}
        {/* <Route path="/" element={<FirstTimePage />} /> */}
        {/* ) : ( */}
        <>
          <Route path="/welcome" element={<DashboardHome />} />
          <Route path="/" element={<Welcome />} />
          <Route path="/news/:itemId" element={<NewDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account/personal-information" element={<StepComponent />} />
          <Route path="/boutique/:slug" element={<Profile />} />
          <Route path="/add-product" element={<AddProducts />} />
          <Route path="/recherche-de-produits" element={<ProductsSearch />} />
          <Route path="/recherche-de-stockiste" element={<StockisteSearch />} />
          <Route path="/:shop_slug/detail/:slug" element={<ProductDetails />} />
          <Route path="/user/notifications" element={<Notifications />} />
          <Route path="/user/messages" element={<Messages />} />
          <Route path="/user/gestion-stock" element={<GestionStock />} />
          <Route path="/user/apparence-themes" element={<ApparenceThemes />} />
          <Route path="/user/docs" element={<Docs />} />
          <Route path="/parametres-du-stockiste" element={<DashboardSettings />} />
          <Route path="/parametres" element={<UserDashboardSettings />} />
          <Route path="/account/register" element={<Register />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/forget-password" element={<ForgetEmail />} />
          <Route path="/account/confirm-code" element={<ConfirmCode />} />
          <Route path="/account/resend-code" element={<ResendCode />} />
          <Route path="/confirmation" element={<SuccessPage />} />
          <Route path="*" element={<Navigate to="/welcome" />} />
        </>
        {/* )} */}
      </Routes>
    </Router>
  );
}

export default App;
