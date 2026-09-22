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
        <main className="bg-background overflow-y-auto flex-1 mt-14 sm:mt-16 md:mt-20">
          {children}
        </main>
        {footer}
      </div>
    </div>
  );
}
