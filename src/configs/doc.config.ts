import { registerAs } from '@nestjs/config';

export default registerAs(
	'doc',
	(): Record<string, any> => ({
		name: process.env.APP_DOC_NAME || 'Happy care Auth APIs Specification',
		description: 'Document for describe whole APIs',
		version: process.env.APP_DOC_VERSION
			? process.env.APP_DOC_VERSION.endsWith('.0')
				? process.env.APP_DOC_VERSION
				: `${process.env.APP_DOC_VERSION}.0`
			: '1.0.0',
		prefix: '/docs',
	}),
);
