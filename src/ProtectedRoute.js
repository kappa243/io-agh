import React from "react";
import { Navigate } from "react-router-dom";
import { useUserPermissionLevel } from "./logic/auth";

const ProtectedRoute = ({ permissionLevel, children }) => {
  const [userPermissionLevel, loading] = useUserPermissionLevel();
  if (loading) return null;
  if (!userPermissionLevel) return <Navigate to="/login" />;
  if (userPermissionLevel !== permissionLevel) return <h1>Forbidden</h1>;
  return children;
};

export default ProtectedRoute;
