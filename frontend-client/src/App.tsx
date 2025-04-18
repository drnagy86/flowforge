import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';
import ConfirmUserPage from './pages/confirmUserPage';
import LandingPage from './pages/landingPage';
import DashboardLayout from './components/layout/DashboardLayout';
import LayoutShell from './components/layout/LayoutShell';

const App = () => {
  const isAuthenticated = () => {
    const accessToken = sessionStorage.getItem('accessToken');
    return !!accessToken;
  };

  return (
    <BrowserRouter>
      <LayoutShell>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/confirm" element={<ConfirmUserPage />} />
          <Route
            path="/home"
            element={
              isAuthenticated() ? (
                <DashboardLayout>
                  <HomePage />
                </DashboardLayout>
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
        </Routes>
      </LayoutShell>
    </BrowserRouter>
  );
};

export default App;





// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import LoginPage from './pages/loginPage';
// import HomePage from './pages/homePage';
// import ConfirmUserPage from './pages/confirmUserPage';
// import LandingPage from './pages/landingPage'; // ← NEW import
// import './App.css';
// import DashboardLayout from './components/layout/DashboardLayout';

// const App = () => {
//   const isAuthenticated = () => {
//     const accessToken = sessionStorage.getItem('accessToken');
//     return !!accessToken;
//   };

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public landing page */}
//         <Route path="/" element={<LandingPage />} />

//         {/* Auth flows */}
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/confirm" element={<ConfirmUserPage />} />

//         {/* Protected home */}
//         <Route
//           path="/home"
//           element={
//             isAuthenticated() ? (
//               <DashboardLayout>
//                 <HomePage />
//               </DashboardLayout>
//             ) : (
//               <Navigate replace to="/login" />
//             )
//           }
//         />


//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
