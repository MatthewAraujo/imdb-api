import type { Song } from '../../enterprise/entities/song'

export abstract class SongsRepository {
	abstract findById(id: string): Promise<Song | null>
	abstract create(question: Song): Promise<void>
}
