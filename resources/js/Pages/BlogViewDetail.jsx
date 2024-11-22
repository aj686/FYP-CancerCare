import React from 'react';
import BlogDetail from '@/Components/My Components/Blog/BlogDetail';
import { usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import NavLink from '@/Components/NavLink';
import PrimaryButton from '@/Components/PrimaryButton';

export default function BlogViewDetail() {
  const { blog } = usePage().props;

  return (
    <>
      <Head>
        <title>{blog.title}</title>
        <meta name="description" content={blog.header} />
      </Head>
      
      <Navbar>
        <li>
          <NavLink href="/homepage" className="text-black">Home</NavLink>
        </li>
        <li>
          <NavLink href="/cancer-information" className="text-black">Cancer</NavLink>
        </li>
        <li>
          <NavLink href="/get-involved" className="text-black">Get Involved</NavLink>
        </li>
        <li>
          <NavLink href="/our-research" className="text-black">Our Research</NavLink>
        </li>
        <li>
          <NavLink href="/product" className="text-black">Shop with Us</NavLink>
        </li>
        <li>
          <NavLink href="/about" className="text-black">About</NavLink>
        </li>
        <li>
          <NavLink href="/login" className="text-white">
            <PrimaryButton className="bg-blue-500 hover:bg-blue-700">Login</PrimaryButton>
          </NavLink>
        </li>
        <li>
          <NavLink href="/register" className="text-white">
            <PrimaryButton>Register</PrimaryButton>
          </NavLink>
        </li>
      </Navbar>
      
      <main className="bg-gray-50 min-h-screen">
        <BlogDetail blog={blog} />
      </main>
    </>
  );
}