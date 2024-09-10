import { SongAlreadyExistsError } from '@/domain/imdb/application/use-cases/errors/song-already-exists-error'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import {
	BadRequestException,
	Body,
	ConflictException,
	Controller,
	HttpCode,
	Post,
	UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { AddSongToPlaylistUseCase } from '@/domain/imdb/application/use-cases/register-song-use-case'

const addSongToPlaylistBodySchema = z.object({
	name: z.string(),
	spotifySongId: z.string().uuid(),
	durationMs: z.number().min(0),
	previewUrl: z.string().url().optional(),
})

const bodyValidationPipe = new ZodValidationPipe(addSongToPlaylistBodySchema)

type AddSongToPlaylistBodySchema = z.infer<typeof addSongToPlaylistBodySchema>

@Controller('/songs')
export class AddSongToPlaylistController {
	constructor(private addSongToPlaylist: AddSongToPlaylistUseCase) { }

	@Post()
	@HttpCode(201)
	@UsePipes(new ZodValidationPipe(addSongToPlaylistBodySchema))
	async handle(
		@Body(bodyValidationPipe) body: AddSongToPlaylistBodySchema,
		@CurrentUser() user: UserPayload,
	) {
		const { name, durationMs, spotifySongId, previewUrl } = body
		const userId = user.sub

		const result = await this.addSongToPlaylist.execute({
			name,
			durationMs,
			spotifySongId,
			previewUrl: previewUrl ? previewUrl : null,
		})

		if (result.isLeft()) {
			const error = result.value

			switch (error.constructor) {
				case SongAlreadyExistsError:
					throw new ConflictException(error.message)
				default:
					throw new BadRequestException(error.message)
			}
		}
	}
}
