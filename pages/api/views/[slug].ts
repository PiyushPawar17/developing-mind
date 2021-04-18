import { NextApiHandler } from 'next';

import db from '@lib/firebase';

const blogViews: NextApiHandler = async (req, res) => {
	const { slug } = req.query;

	if (req.method === 'GET') {
		const doc = await db
			.collection('views')
			.doc(slug as string)
			.get();

		if (!doc.exists || !doc.data()) {
			return res.status(200).json({ views: 0 });
		}

		return res.json(doc.data());
	}

	if (req.method === 'POST') {
		const doc = await db
			.collection('views')
			.doc(slug as string)
			.get();

		if (!doc.exists) {
			await db
				.collection('views')
				.doc(slug as string)
				.set({ views: 1 }, { merge: true });

			return res.status(200).end();
		}

		await db
			.collection('views')
			.doc(slug as string)
			.update({ views: doc.data()!.views + 1 });

		return res.status(200).end();
	}
};

export default blogViews;
