"use client";

import { Provider } from "react-redux";
import store from "./store";
import Breadcrumb from "./Breadcrumb";
import Session from "./Account/Session";

export default function KambazLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <Session>
        <Breadcrumb />
        {children}
      </Session>
    </Provider>
  );
}