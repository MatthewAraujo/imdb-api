import {
	BadRequestException,
	Body,
	Controller,
	Param,
	Post,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { CreatePlaylistUseCase } from '@/domain/imdb/application/use-cases/register-playlist-use-case'

const createplaylistQuestionBodySchema = z.object({
	name: z.string(),
	description: z.string().optional()
})

const bodyValidationPipe = new ZodValidationPipe(createplaylistQuestionBodySchema)

type CreatePlaylistBodySchema = z.infer<typeof createplaylistQuestionBodySchema>

@Controller('/playlists')
export class CreatePlaylistController {
	constructor(private createplaylist: CreatePlaylistUseCase) { }

	@Post()
	async handle(
		@Body(bodyValidationPipe) body: CreatePlaylistBodySchema,
		@CurrentUser() user: UserPayload,
	) {
		const { name, description } = body

		const userId = user.sub

		const result = await this.createplaylist.execute({
			name,
			userId,
			description: description ? description : null
		})

		if (result.isLeft()) {
			throw new BadRequestException()
		}
	}
}