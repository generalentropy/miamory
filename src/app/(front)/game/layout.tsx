import { ReactNode } from "react";

export default function frontLayout({ children }: { children: ReactNode }) {
  return <div className="flex min-h-screen border">{children}</div>;
}
