import type { UseCaseError } from '@/core/errors/use-case-error'

export class SongAlreadyIsOnPlaylist extends Error implements UseCaseError {
	constructor(identifier: string) {
		super(`Song "${identifier}" already on playlist.`)
	}
}
