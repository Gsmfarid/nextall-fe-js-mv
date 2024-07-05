import React from 'react';

// components
import AddCampaign from 'src/components/_admin/campaigns/addCampaign';
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';

export default function page() {
  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading="Campaigns List"
        links={[
          {
            name: 'Admin Dashboard',
            href: '/admin'
          },
          {
            name: 'Campaigns',
            href: '/admin/campaigns'
          },
          {
            name: 'Add Campaign'
          }
        ]}
      />
      <AddCampaign />
    </div>
  );
}
