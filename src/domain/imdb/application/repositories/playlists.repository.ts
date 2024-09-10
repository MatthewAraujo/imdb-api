import type { Playlist } from '../../enterprise/entities/playlist'

export abstract class PlaylistsRepository {
	abstract create(playlist: Playlist): Promise<void>
	abstract findById(playlistId: string): Promise<Playlist | null>
}
