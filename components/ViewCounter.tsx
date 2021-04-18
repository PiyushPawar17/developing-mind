import { useQuery } from 'react-query';
import format from 'comma-number';

import { getBlogViews } from '@lib/queryHelpers';

interface ViewCounterProps {
	slug: string;
}

const ViewCounter: React.FC<ViewCounterProps> = ({ slug }) => {
	const { data, status } = useQuery([`/api/views/${slug}`], getBlogViews, { retry: false });

	if (status === 'loading') {
		return <>• fetching views...</>;
	}

	if (!data) {
		return null;
	}

	if (data.views === 0) {
		return null;
	}

	return <>• {data.views === 1 ? `${format(data.views)} view` : `${format(data.views)} views`}</>;
};

export default ViewCounter;
