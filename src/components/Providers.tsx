"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { store } from "@/store";
import { useAppDispatch } from "@/store/hooks";
import { hydrate } from "@/store/authSlice";
import EmergencyModal from "@/components/EmergencyModal";
import Toaster from "@/components/Toaster";

/** Reads any saved session from localStorage once, on first mount. */
function AuthHydrator() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(hydrate());
  }, [dispatch]);
  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <AuthHydrator />
        {children}
        <EmergencyModal />
        <Toaster />
      </ThemeProvider>
    </Provider>
  );
}
