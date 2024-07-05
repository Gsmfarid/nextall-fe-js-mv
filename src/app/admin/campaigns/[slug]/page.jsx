'use client';
import React from 'react';
import toast from 'react-hot-toast';

// components
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';
import EditCampaign from 'src/components/_admin/campaigns/editCampaign';

// api
import * as api from 'src/services';
import { useQuery } from 'react-query';

export default function Page({ params }) {
  const { data, isLoading } = useQuery(['get-admin-campaign'], () => api.getCampaignByAdmin(params.slug), {
    onError: (err) => {
      toast.error(err.response.data.message || 'Something went wrong!');
    }
  });
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
            name: 'Edit Campaign'
          }
        ]}
      />
      <EditCampaign isLoading={isLoading} data={data?.data} />
    </div>
  );
}
