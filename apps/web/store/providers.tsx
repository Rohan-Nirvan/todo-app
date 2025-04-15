"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import type { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <Provider store={store}>{children}</Provider>;
}
// 'use client';

// import { Provider as ReduxProvider } from 'react-redux';
// import { store } from './store';
// import { ReactNode } from 'react';

// interface ProvidersProps {
//   children: ReactNode;
// }

// export function Providers({ children }: ProvidersProps) {
//   return <ReduxProvider store={store}>{children}</ReduxProvider>;
// }

// "use client"
// import { Provider } from "react-redux";
// import { store } from "./store";

// export function Providers({children: any}) {
//   return <Provider store={store}>
//   {children}
//   </Providers>
// }
