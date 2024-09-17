import type { UseCaseError } from '@/core/errors/use-case-error'

export class UserDoesntOwnThatPlaylistError extends Error implements UseCaseError {
	constructor() {
		super('You doesnt own that playlist.')
	}
}
