import { AddSongToPlaylistUseCase } from '@/domain/imdb/application/use-cases/add-song-to-paylist-use-case'
import { SongAlreadyExistsError } from '@/domain/imdb/application/use-cases/errors/song-already-exists-error'
import { UserDoesntOwnThatPlaylistError } from '@/domain/imdb/application/use-cases/errors/user-doesnt-own-that-playlist-error'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import {
	BadRequestException,
	Body,
	ConflictException,
	Controller,
	HttpCode,
	Param,
	Post,
	UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { UserPayload } from '@/infra/auth/jwt.strategy'

const addSongToPlaylistBodySchema = z.object({
	songId: z.string().uuid()
})

const bodyValidationPipe = new ZodValidationPipe(addSongToPlaylistBodySchema)

type AddSongToPlaylistBodySchema = z.infer<typeof addSongToPlaylistBodySchema>

@Controller('/playlists/:playlist_id/tracks')
export class AddSongToPlaylistController {
	constructor(private addSongToPlaylist: AddSongToPlaylistUseCase) { }

	@Post()
	@HttpCode(201)
	async handle(
		@Body(bodyValidationPipe) body: AddSongToPlaylistBodySchema,
		@CurrentUser() user: UserPayload,
		@Param('playlist_id') playlistId: string,
	) {
		const { songId } = body
		const userId = user.sub

		const result = await this.addSongToPlaylist.execute({
			playlistId,
			songId,
			userId,
		})

		if (result.isLeft()) {
			const error = result.value

			switch (error.constructor) {
				case SongAlreadyExistsError:
					throw new ConflictException(error.message)
				case UserDoesntOwnThatPlaylistError:
					throw new ConflictException(error.message)
				default:
					throw new BadRequestException(error.message)
			}
		}
	}
}
