import { registerAs } from '@nestjs/config';

export default registerAs(
	'vnpay',
	(): Record<string, any> => ({
		payment: {
			vnp_Version: process.env.VNP_VERSION,
			vnp_HashSecret: process.env.VNP_HASHSECRET,
			vnp_TmnCode: process.env.VNP_TMNCODE,
			vnp_Url: process.env.VNP_URL,
			vnp_ReturnUrl: process.env.VNP_RETURNURL,
			vnp_Locale: process.env.VNP_LOCALE,
			vnp_CurrCode: process.env.VNP_CURRCODE,
		},
	}),
);
