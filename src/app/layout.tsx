import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const satoshi = localFont({
  src: "../../public/fonts/Satoshi-Variable.woff2",
  display: "swap",
  variable: "--font-satoshi",
  weight: "300 900",
});

export const metadata: Metadata = {
  title: "Performance CRO Audit | CodeBlib",
  description: "Performance-Led CRO landing page designed for the Australian market.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics Placeholder */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // window.dataLayer = window.dataLayer || [];
              // function gtag(){dataLayer.push(arguments);}
              // gtag('js', new Date());
              // gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
        {/* LinkedIn Insight Tag Placeholder */}
        <Script
          id="linkedin-insight"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
             __html: `
              // _linkedin_partner_id = "XXXXXXX";
              // window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
              // window._linkedin_data_partner_ids.push(_linkedin_partner_id);
             `
          }}
        />
      </head>
      <body className={`${satoshi.variable} antialiased`}>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
