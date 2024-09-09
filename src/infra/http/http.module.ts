import { Module } from '@nestjs/common'

import { AuthenticateStudentUseCase } from '@/domain/finder/application/use-cases/authenticate-student'
import { RegisterStudentUseCase } from '@/domain/finder/application/use-cases/register-student'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { StorageModule } from '../storage/storage.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'

@Module({
	imports: [DatabaseModule, CryptographyModule, StorageModule],
	controllers: [CreateAccountController, AuthenticateController],
	providers: [RegisterStudentUseCase, AuthenticateStudentUseCase],
})
export class HttpModule {}
