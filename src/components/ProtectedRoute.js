'use client';

import { useRouter } from "next/navigation";
import { useUserPermissionLevel } from "@/logic/auth";

const ProtectedRoute = ({ permissionLevel, children }) => {
  const router = useRouter();
  const [userPermissionLevel, loading] = useUserPermissionLevel();
  if (loading) return null;
  if (!userPermissionLevel) {
    router.replace("/login");
    return null;
  }
  if (userPermissionLevel !== permissionLevel) return <h1>Forbidden</h1>;
  return children;
};

export default ProtectedRoute;
