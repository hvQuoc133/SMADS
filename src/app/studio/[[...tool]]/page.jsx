"use client";

import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';

export default function StudioPage() {
  return (
    <div suppressHydrationWarning style={{ height: '100vh' }}>
      <NextStudio config={config} />
    </div>
  );
}