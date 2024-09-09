import { NestFactory } from '@nestjs/core'
import { EnvService } from './env/env.service'
import { AppModule } from './http/app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		// logger: false,
	})
	const envService = app.get(EnvService)
	const port = envService.get('PORT')

	await app.listen(port)
}
bootstrap()
