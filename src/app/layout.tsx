"use service";

import "antd/dist/reset.css";
import type { Metadata } from "next";
import "./globals.css";
import SessionAuthProvider from "@/context/SessionAuthProvider";
import Navbar from "@/components/Navbar";
import ProgressContainerView from "@/components/ProgressContainerView";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Layout } from "antd";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Linguish App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionAuthProvider>
          <AntdRegistry>
            <Layout style={{ backgroundColor: "transparent" }}>
              <Header
                style={{
                  padding: 0,
                  height: 80,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
              >
                <Navbar />
              </Header>
              <Layout style={{ backgroundColor: "transparent" }}>
                <Content className="flex flex-col justify-center items-center h-[calc(100vh-173px)] m-3 sm:m-8">
              <div className="flex justify-center items-center relative bottom-10">
                <ProgressContainerView />
              </div>
                  <div className="bg-pink/60 rounded-2xl backdrop-blur-lg p-6 sm:p-10 w-full border-purple-300 border max-w-md sm:max-w-lg lg:max-w-3xl 2xl:max-w-6xl 2xl:h-[550px] flex flex-col justify-center items-center">
                    {children}
                  </div>
                </Content>

                <Footer
                  style={{
                    textAlign: "center",
                    color: "white",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center items-center  w-full">
                    <p className="text-[12px] sm:text-[14px]">
                      Linguish ©{new Date().getFullYear()}
                    </p>
                    <p className="text-[11px] sm:text-[12px] text-gray-300">
                      Created by TeamDev-NoCountry
                    </p>
                  </div>
                </Footer>
              </Layout>
            </Layout>
          </AntdRegistry>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
