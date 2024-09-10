import { PlaylistsRepository } from '@/domain/imdb/application/repositories/playlists.repository'
import { Playlist } from '@/domain/imdb/enterprise/entities/playlist'
import { Injectable } from '@nestjs/common'
import { PrismaPlaylistMapper } from '../mappers/prisma-playlist-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaPlaylistsRepository implements PlaylistsRepository {
	constructor(private prisma: PrismaService) { }

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
