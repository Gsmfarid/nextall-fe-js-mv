import React from 'react';

// components
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';
import UsersDetails from 'src/components/_admin/users/userDetails';

export default async function page(props) {
  const params = await props.params;
  return (
    <>
      <HeaderBreadcrumbs
        admin
        heading="User Details"
        links={[
          {
            name: 'Dashboard',
            href: '/admin'
          },
          {
            name: 'Users',
            href: '/admin/users'
          },
          {
            name: 'Users details'
          }
        ]}
      />
      <UsersDetails id={params.id} />
    </>
  );
}
