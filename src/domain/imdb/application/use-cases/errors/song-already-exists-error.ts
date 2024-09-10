import type { UseCaseError } from '@/core/errors/use-case-error'

export class SongAlreadyExistsError extends Error implements UseCaseError {
	constructor(identifier: string) {
		super(`Song "${identifier}" already exists.`)
	}
}
