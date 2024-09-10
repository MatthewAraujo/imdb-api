import { SongsRepository } from '@/domain/imdb/application/repositories/songs-repository'
import { Song } from '@/domain/imdb/enterprise/entities/song'
import { Injectable } from '@nestjs/common'
import { PrismaSongMapper } from '../mappers/prisma-song-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaSongsRepository implements SongsRepository {
	constructor(private prisma: PrismaService) { }

	async findById(spotifySongId: string): Promise<Song | null> {
		const song = await this.prisma.song.findUnique({
			where: {
				spotifySongId,
			},
		})

		if (!song) {
			return null
		}

		return PrismaSongMapper.toDomain(song)
	}

	async create(song: Song): Promise<void> {
		const data = PrismaSongMapper.toPrisma(song)

		await this.prisma.song.create({
			data,
		})
	}
}
