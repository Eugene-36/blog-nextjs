'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { notify } from '@/utils/toast';

const ToastFromQuery = () => {
  const sp = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const t = sp.get('toast');
    if (!t) return;
    switch (t) {
      case 'role_updated':
        notify.success('User role updated successfully');
        break;
      case 'post_deleted':
        notify.error('Post deleted successfully');
        break;
      case 'forbidden':
        notify.loading('You do not have permission to perform this action');
        break;
      default:
        break;
    }
    const url = new URL(window.location.href);
    url.searchParams.delete('toast');
    router.replace(url.pathname + url.search, { scroll: false });
  }, [sp, router]);

  return null;
};

export default ToastFromQuery;
