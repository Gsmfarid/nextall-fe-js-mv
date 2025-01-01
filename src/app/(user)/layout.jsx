import React from 'react';

// mui
import { Toolbar } from '@mui/material';

// components
import Navbar from 'src/layout/_main/navbar';
import Footer from 'src/layout/_main/footer';
import Topbar from 'src/layout/_main/topbar';
import ActionBar from 'src/layout/_main/actionbar';
import * as api from 'src/services';
// Meta information
export const metadata = {
  title: 'Nextall E-commerce Script | Your Gateway to Seamless Shopping and Secure Transactions',
  description:
    'Log in to Nextall for secure access to your account. Enjoy seamless shopping, personalized experiences, and hassle-free transactions. Your trusted portal to a world of convenience awaits. Login now!',
  applicationName: 'Nextall',
  authors: 'Nextall',
  keywords: 'ecommerce, Nextall, Commerce, Login Nextall, LoginFrom Nextall',
  icons: {
    icon: '/favicon.png'
  },
  openGraph: {
    images: 'https://nextall.vercel.app/opengraph-image.png?1c6a1fa20db2840f'
  }
};
export const dynamic = 'force-dynamic';
export const revalidate = 60;
export default async function RootLayout({ children }) {
  const { data: currencies } = await api.getCurrencies();
  const { data: categories } = await api.getAllCategories();

  return (
    <>
      <Topbar />
      <Navbar currencies={currencies} />
      <ActionBar categories={categories} />
      {children}
      <Toolbar sx={{ display: { xs: 'block', md: 'none' } }} />
      <Footer />
    </>
  );
}
