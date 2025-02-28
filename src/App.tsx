import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { ChatBot } from './pages/ChatBot';
import { Subscription } from './pages/Subscription';
import { Login } from './pages/Login/Login';
import { AuthContext } from './context/AuthContext';

import { NotFound } from './pages/NotFound';

import { MainLayout } from './layouts/MainLayout';
import { useAuthHook } from './context/useAuthHook';
import { configureAPI } from './utils/api';
import { AuthorizationWrapper } from './layouts/AuthorizationWrapper';
import { routes } from './config/routesConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Loader } from '@mantine/core';
import '@mantine/core/styles.css';
import { AuthLayout } from './layouts/AuthLayout';
import { LoadingWrapper } from './layouts/LoadingWrapper';
import { Forbidden } from './pages/Forbidden';
import { Users } from './pages/Users';
import { ToastContainer } from 'react-toastify';
import { ChatBotSettings } from './pages/ChatBotSettings';
import { Checkout } from './pages/Checkout';
import { Plans } from './pages/Plans/Plans';
import { Success } from './pages/Success';

export const App = () => {
  const authData = useAuthHook();
  const navigate = useNavigate();
  const [queryClient] = useState(() => new QueryClient());

  const { auth, isLoggedIn, handleLogout, loadingAuth } = authData;

  if (loadingAuth) {
    return (
      <LoadingWrapper>
        <Loader size={46} />;
      </LoadingWrapper>
    );
  }

  // Handlers
  configureAPI({
    token: auth?.accessToken,
    onSignOut: handleLogout,
    onNotFound: () => {
      navigate('/404');
    },
    onNoAccess: () => {
      navigate('/403');
    },
  });

  return (
    <AuthContext.Provider value={authData}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          position="top-right"
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {!isLoggedIn && (
          <AuthLayout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="*"
                element={<Navigate to="/login" replace={true} />}
              />
            </Routes>
          </AuthLayout>
        )}

        {isLoggedIn && (
          <MainLayout>
            <Routes>
              <Route
                path={routes.userPage.home.path}
                element={
                  <AuthorizationWrapper
                    pageRoles={routes.userPage.home.roles}
                    page={<Home />}
                  />
                }
              />
              <Route
                path={routes.userPage.chatBot.path}
                element={
                  <AuthorizationWrapper
                    pageRoles={routes.userPage.chatBot.roles}
                    page={<ChatBot />}
                  />
                }
              />
              <Route
                path={routes.userPage.subscription.path}
                element={
                  <AuthorizationWrapper
                    pageRoles={routes.userPage.subscription.roles}
                    page={<Subscription />}
                  />
                }
              />
              <Route
                path={routes.userPage.users.path}
                element={
                  <AuthorizationWrapper
                    pageRoles={routes.userPage.users.roles}
                    page={<Users />}
                  />
                }
              />

              <Route
                path={routes.userPage['chatbot-settings'].path}
                element={
                  <AuthorizationWrapper
                    pageRoles={routes.userPage['chatbot-settings'].roles}
                    page={<ChatBotSettings />}
                  />
                }
              />

              <Route
                path={routes.userPage.plans.path}
                element={
                  <AuthorizationWrapper
                    pageRoles={routes.userPage.plans.roles}
                    page={<Plans />}
                  />
                }
              />

              <Route
                path={routes.userPage.success.path}
                element={
                  <AuthorizationWrapper
                    pageRoles={routes.userPage.success.roles}
                    page={<Success />}
                  />
                }
              />

              <Route path="/checkout" element={<Checkout />} />

              <Route path="/403" element={<Forbidden />} />

              <Route path="/404" element={<NotFound />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
        )}
      </QueryClientProvider>
    </AuthContext.Provider>
  );
};
