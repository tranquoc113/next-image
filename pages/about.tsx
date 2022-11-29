import { AdminLayout } from '@/component/layout/admin';
import * as React from 'react';

export interface IAppProps {
}

export default function AboutPage(props: IAppProps) {
  return (
    <div>
      About
    </div>
  );
}

AboutPage.Layout = AdminLayout

export async function getStaticProps() {
	console.log('get static props')

	return {
		props: {},
	}
}