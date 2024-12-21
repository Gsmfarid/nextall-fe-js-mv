'use client';
import React from 'react';
import dynamic from 'next/dynamic';
const SubscriptionDialog = dynamic(() => import('../../../dialog/subcription'), {
  ssr: false
});
export default function index() {
  return <SubscriptionDialog />;
}
