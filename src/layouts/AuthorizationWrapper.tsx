/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, FC, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface PropsTypes {
  pageRoles: string[];
  page: ReactElement;
}

export const AuthorizationWrapper: FC<PropsTypes> = ({
  pageRoles,
  page,
}): ReactElement => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext) ?? {};

  const roles = auth?.user?.roles;
  let isAuthorized = false;

  roles?.forEach(({ role: { name } }) => {
    if (!isAuthorized) {
      isAuthorized = pageRoles.includes(name);
    }
  });

  useEffect(() => {
    if (!isAuthorized)
      navigate('/403', {
        replace: true,
      });
  }, [isAuthorized]);
  return <div>{isAuthorized && page}</div>;
};
