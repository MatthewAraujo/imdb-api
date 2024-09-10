import { Module } from '@nestjs/common'

import { AuthenticateUserUseCase } from '@/domain/imdb/application/use-cases/authenticate-user'
import { RegisterUserUseCase } from '@/domain/imdb/application/use-cases/register-user'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { StorageModule } from '../storage/storage.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'

@Module({
	imports: [DatabaseModule, CryptographyModule, StorageModule],
	controllers: [CreateAccountController, AuthenticateController],
	providers: [RegisterUserUseCase, AuthenticateUserUseCase],
})
export class HttpModule {}
