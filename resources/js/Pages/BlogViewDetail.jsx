import React from 'react';
import BlogDetail from '@/Components/My Components/Blog/BlogDetail';
import { usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import NavLink from '@/Components/NavLink';
import PrimaryButton from '@/Components/PrimaryButton';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import Footer from '@/Components/My Components/Footer';

export default function BlogViewDetail() {
  const { blog } = usePage().props;

  return (
    <>
      <Head>
        <title>{blog.title}</title>
        <meta name="description" content={blog.header} />
      </Head>
      
      <DynamicNavbar />
      
      <main className="bg-gray-50 min-h-screen">
        <BlogDetail blog={blog} />
      </main>

      <Footer />
    </>
  );
}