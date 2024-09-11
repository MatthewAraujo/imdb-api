import type { Playlist } from '../../enterprise/entities/playlist'
import { PlaylistSong } from '../../enterprise/entities/playlistSong';

export abstract class PlaylistsRepository {
	abstract create(playlist: Playlist): Promise<void>
	abstract findById(playlistId: string): Promise<Playlist | null>
	abstract findOwner(userId: string, playlistId: string): Promise<boolean>
	abstract addSong(playlistSong: PlaylistSong): Promise<void>
	// abstract removeManySongs()
}
