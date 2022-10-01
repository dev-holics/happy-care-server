import AppConfig from 'src/configs/app.config';
import HelperConfig from 'src/configs/helper.config';
import DocConfig from 'src/configs/doc.config';
import FileConfig from 'src/configs/file.config';
import MiddlewareConfig from 'src/configs/middleware.config';
import RequestConfig from 'src/configs/request.config';
import DatabaseConfig from 'src/configs/database.config';
import RedisConfig from 'src/configs/redis.config';
import AuthConfig from 'src/configs/auth.config';
import AwsConfig from 'src/configs/aws.config';

export default [
	AppConfig,
	AuthConfig,
	HelperConfig,
	DocConfig,
	FileConfig,
	MiddlewareConfig,
	RequestConfig,
	DatabaseConfig,
	RedisConfig,
	AwsConfig,
];
