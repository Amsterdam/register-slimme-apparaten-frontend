import { Route, Routes } from 'react-router-dom';

import APP_ROUTES from '../../services/appRoutes';
import MapPage from '../../pages/MapPage';
import Categories from '../../pages/DeviceCategories';
import About from '../../pages/About';
import FAQ from '../../pages/FAQ';
import Migration from '../../pages/Migration';
import NotFoundPage from '../NotFoundPage';

export const App = () => (
  <Routes>
    <Route path="/" element={<MapPage />} />
    <Route path={APP_ROUTES.CATEGORIES} element={<Categories />} />
    <Route path={APP_ROUTES.ABOUT_FAQ} element={<FAQ />} />
    <Route path={APP_ROUTES.ABOUT} element={<About />} />
    <Route path={APP_ROUTES.MIGRATION} element={<Migration />} />
    <Route path="" element={<NotFoundPage />} />
  </Routes>
);

export default App;
