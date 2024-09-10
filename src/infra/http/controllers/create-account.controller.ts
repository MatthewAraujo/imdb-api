import { UserAlreadyExistsError } from '@/domain/imdb/application/use-cases/errors/user-already-exists-error'
import type { RegisterUserUseCase } from '@/domain/imdb/application/use-cases/register-user'
import { Public } from '@/infra/auth/public'
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

const createAccountBodySchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
	profileImageUrl: z.string().url()
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
@Public()
export class CreateAccountController {
	constructor(private registerUser: RegisterUserUseCase) { }

	@Post()
	@HttpCode(201)
	@UsePipes(new ZodValidationPipe(createAccountBodySchema))
	async handle(@Body() body: CreateAccountBodySchema) {
		const { name, email, password, profileImageUrl } = body

		const result = await this.registerUser.execute({
			name,
			email,
			password,
			profileImageUrl,
		})

		if (result.isLeft()) {
			const error = result.value

			switch (error.constructor) {
				case UserAlreadyExistsError:
					throw new ConflictException(error.message)
				default:
					throw new BadRequestException(error.message)
			}
		}
	}
}
