import { PlaylistsRepository } from '@/domain/imdb/application/repositories/playlists.repository'
import { Playlist } from '@/domain/imdb/enterprise/entities/playlist'
import { Injectable } from '@nestjs/common'
import { PrismaPlaylistMapper } from '../mappers/prisma-playlist-mapper'
import { PrismaService } from '../prisma.service'
import { PrismaPlaylistSongMapper } from '../mappers/prisma-playlistSong-mapper'
import { PlaylistSong } from '@/domain/imdb/enterprise/entities/playlistSong'

@Injectable()
export class PrismaPlaylistsRepository implements PlaylistsRepository {
	constructor(private prisma: PrismaService) { }
	async findOwner(userId: string, playlistId: string): Promise<boolean> {
		const owner = await this.prisma.playlist.findFirst({
			where: {
				userId,
				id: playlistId,
			},
		})

		if (!owner) {
			return false
		}

		return true
	}

	async addSong(playlistSong: PlaylistSong): Promise<void> {
		const data = PrismaPlaylistSongMapper.toPrisma(playlistSong)
		await this.prisma.playlistSong.create({
			data: {
				playlistId: data.playlistId,
				songId: data.songId,

			}
		})
	}

	async findById(playlistId: string): Promise<Playlist | null> {
		const playlist = await this.prisma.playlist.findFirst({
			where: {
				id: playlistId,
			},
		})

		if (!playlist) {
			return null
		}

		return PrismaPlaylistMapper.toDomain(playlist)
	}

	async create(playlist: Playlist): Promise<void> {
		const data = PrismaPlaylistMapper.toPrisma(playlist)

		await this.prisma.playlist.create({
			data,
		})
	}
}
