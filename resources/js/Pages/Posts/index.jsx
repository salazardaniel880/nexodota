import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';
import PostsList from '../components/PostsList';


const IndexPage = () => {
  return (
    <AuthenticatedLayout >
         <Head title="posts" />
    <div>
      <h1>Bienvenido a mi Blog</h1>
      <PostsList />
    </div>
    </AuthenticatedLayout>
  );
};

export default IndexPage;