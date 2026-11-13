import Script from "next/script";

export default function MiniAppLayout({ children }: { children: React.ReactNode }) {
  return <>
    <Script src="https://telegram.org/js/telegram-web-app.js?65" strategy="beforeInteractive" />
    {children}
  </>;
}
