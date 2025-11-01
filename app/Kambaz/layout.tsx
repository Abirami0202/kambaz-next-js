"use client";

import { Provider } from "react-redux";
import store from "./store";
import Breadcrumb from "./Breadcrumb";

export default function KambazLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <Breadcrumb />
      {children}
    </Provider>
  );
}