"use client";

import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";

export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const fetchProfile = async () => {
    try {
      const currentUser = await client.profile();
      dispatch(setCurrentUser(currentUser));
      setPending(false);
    } catch (err: any) {
      console.error(err);
      // User is not logged in
      dispatch(setCurrentUser(null));
      setPending(false);
      
      // Redirect to signin if trying to access protected routes
      const protectedRoutes = ['/Kambaz/Dashboard', '/Kambaz/Courses', '/Kambaz/Account'];
      const isProtectedRoute = protectedRoutes.some(route => pathname?.startsWith(route));
      
      if (isProtectedRoute) {
        router.push('/Kambaz/Account/Signin');
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!pending) {
    return children;
  }

  return null;
}