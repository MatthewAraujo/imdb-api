import { Module } from '@nestjs/common'

import { AuthenticateUserUseCase } from '@/domain/imdb/application/use-cases/authenticate-user'
import { RegisterUserUseCase } from '@/domain/imdb/application/use-cases/register-user'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { StorageModule } from '../storage/storage.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreatePlaylistController } from './controllers/create-playlist.controller'
import { AddSongToPlaylistController } from './controllers/add-song-to-playlist.controller'
import { CreatePlaylistUseCase } from '@/domain/imdb/application/use-cases/register-playlist-use-case'
import { CreateAccountController } from './controllers/create-account.controller'
import { AddSongToPlaylistUseCase } from '@/domain/imdb/application/use-cases/register-song-use-case'

@Module({
	imports: [DatabaseModule, CryptographyModule, StorageModule],
	controllers: [CreateAccountController, AuthenticateController, CreatePlaylistController, AddSongToPlaylistController],
	providers: [RegisterUserUseCase, AuthenticateUserUseCase, CreatePlaylistUseCase, AddSongToPlaylistUseCase],
})
export class HttpModule { }
