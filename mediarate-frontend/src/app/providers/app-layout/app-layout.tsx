import { ReactElement } from "react";

interface AppLayout {
  children: React.ReactNode;
  footer: ReactElement;
  header: ReactElement;
  sidebar: ReactElement;
}

export function AppLayout({ children, header, footer, sidebar }: AppLayout) {
  return (
    <div className="w-full">
      {sidebar}
      <div className="flex flex-col min-h-dvh">
        {header}
        <main className="max-w-370 w-full bg-red-10 mx-auto px-10 overflow-y-auto flex-1 mt-10 sm:mt-12 md:mt-14">
          {children}
        </main>
        {footer}
      </div>
    </div>
  );
}
