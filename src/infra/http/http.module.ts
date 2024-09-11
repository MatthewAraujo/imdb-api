import { Module } from '@nestjs/common'

import { AuthenticateUserUseCase } from '@/domain/imdb/application/use-cases/authenticate-user'
import { CreatePlaylistUseCase } from '@/domain/imdb/application/use-cases/register-playlist-use-case'
import { RegisterUserUseCase } from '@/domain/imdb/application/use-cases/register-user'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { StorageModule } from '../storage/storage.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreatePlaylistController } from './controllers/create-playlist.controller'
import { APIModule } from '../api/api.module'
import { AddSongToPlaylistController } from './controllers/add-song-to-playlist.controller'
import { AddSongToPlaylistUseCase } from '@/domain/imdb/application/use-cases/add-song-to-paylist-use-case'

@Module({
	imports: [DatabaseModule, CryptographyModule, StorageModule, APIModule],
	controllers: [
		CreateAccountController,
		AuthenticateController,
		CreatePlaylistController,
		AddSongToPlaylistController,
	],
	providers: [
		RegisterUserUseCase,
		AuthenticateUserUseCase,
		CreatePlaylistUseCase,
		AddSongToPlaylistUseCase
	],
})
export class HttpModule { }
