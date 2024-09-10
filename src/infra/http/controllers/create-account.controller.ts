import { UserAlreadyExistsError } from "@/domain/imdb/application/use-cases/errors/user-already-exists-error"
import { RegisterUserUseCase } from "@/domain/imdb/application/use-cases/register-user"
import { Post, HttpCode, UsePipes, Body, ConflictException, BadRequestException, Controller } from "@nestjs/common"
import { z } from "zod"
import { ZodValidationPipe } from "../pipes/zod-validation-pipe"
import { Public } from "@/infra/auth/public"

const createAccountBodySchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
	profileImageUrl: z.string().url().optional()
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
			profileImageUrl: profileImageUrl ? '' : '',
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
