import { Song } from '@/domain/imdb/enterprise/entities/song'

export abstract class SongsRepository {
	abstract findById(id: string): Promise<Song | null>
}
