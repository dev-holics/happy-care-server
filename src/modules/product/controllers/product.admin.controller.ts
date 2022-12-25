import {
	ProductCreateDto,
	ProductLogCreateDto,
	ProductLogExportDto,
	ProductLogImportDto,
	ProductLogListQueryDto,
	ProductParamDto,
	ProductUpdateDto,
} from 'src/modules/product/dtos';
import { AuthApiKeyGuard } from 'src/common/auth/decorators/auth.api-key.decorator';
import {
	Body,
	Controller,
	HttpStatus,
	Post,
	Put,
	Param,
	Get,
	Query,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthJwtGuard } from 'src/common/auth/decorators/auth.jwt.decorator';
import { ProductService } from 'src/modules/product/services';
import { PERMISSIONS } from 'src/common/auth/constants';
import {
	Response,
	ResponsePagingBase,
} from 'src/common/response/decorators/response.decorator';
import { RequestBodyDtoGuard } from 'src/common/request/decorators/request.decorator';
import { IResponsePaging } from 'src/common/response/interfaces/response.interface';

@ApiTags('Admin.Product')
@Controller({
	version: '1',
	path: '/products',
})
export class ProductAdminController {
	constructor(private readonly productService: ProductService) {}

	@Response('created successfully', { doc: { httpStatus: HttpStatus.CREATED } })
	@AuthJwtGuard([PERMISSIONS.CREATE_PRODUCT])
	@AuthApiKeyGuard()
	@RequestBodyDtoGuard(ProductCreateDto)
	@Post('')
	createProduct(@Body() productCreateDto: ProductCreateDto) {
		return this.productService.createProduct(productCreateDto);
	}

	@Response('updated successfully', { doc: { httpStatus: HttpStatus.OK } })
	@AuthJwtGuard([PERMISSIONS.UPDATE_PRODUCT])
	@AuthApiKeyGuard()
	@RequestBodyDtoGuard(ProductUpdateDto)
	@ApiParam({
		name: 'productId',
		type: 'string',
	})
	@Put('/:productId')
	updateProduct(
		@Param() productParamDto: ProductParamDto,
		@Body() productUpdateDto: ProductUpdateDto,
	) {
		return this.productService.updateProduct(
			productParamDto.productId,
			productUpdateDto,
		);
	}

	@ResponsePagingBase('product.getList')
	@AuthJwtGuard([PERMISSIONS.READ_PRODUCT_LOG])
	@AuthApiKeyGuard()
	@Get('/logs')
	getProducts(
		@Query() productLogListQueryDto: ProductLogListQueryDto,
	): Promise<IResponsePaging> {
		return this.productService.getProductLogs(productLogListQueryDto);
	}

	@Response('create product log import successfully', {
		doc: { httpStatus: HttpStatus.CREATED },
	})
	@AuthJwtGuard([PERMISSIONS.CREATE_PRODUCT_LOG])
	@AuthApiKeyGuard()
	@RequestBodyDtoGuard(ProductLogImportDto)
	@Post('logs-import')
	importProductLog(@Body() productLogImportDto: ProductLogImportDto) {
		return this.productService.importProductLog(productLogImportDto);
	}

	@Response('create product log export successfully', {
		doc: { httpStatus: HttpStatus.CREATED },
	})
	@AuthJwtGuard([PERMISSIONS.CREATE_PRODUCT_LOG])
	@AuthApiKeyGuard()
	@RequestBodyDtoGuard(ProductLogExportDto)
	@Post('logs-export')
	exportProductLog(@Body() productLogExportDto: ProductLogExportDto) {
		return this.productService.exportProductLog(productLogExportDto);
	}

	@Response('updated successfully', { doc: { httpStatus: HttpStatus.OK } })
	@AuthJwtGuard([PERMISSIONS.CREATE_PRODUCT_LOG])
	@AuthApiKeyGuard()
	@RequestBodyDtoGuard(ProductLogCreateDto)
	@Post('/update-stock')
	updateStock(@Body() productLogCreateDto: ProductLogCreateDto) {
		return this.productService.updateStock(productLogCreateDto);
	}
}
