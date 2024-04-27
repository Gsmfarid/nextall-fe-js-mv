import React from 'react';
import AdminBestSelling from 'src/components/cards/adminBestSelling';
import PropTypes from 'prop-types';
export default function BestSelling({ ...props }) {
  const { data, loading, isVendor } = props;
  return <AdminBestSelling data={data} loading={loading} isVendor={isVendor} />;
}

BestSelling.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired
};
