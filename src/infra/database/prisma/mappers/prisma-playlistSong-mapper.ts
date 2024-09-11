import { PlaylistSong } from '@/domain/imdb/enterprise/entities/playlistSong'
import type { Prisma, PlaylistSong as PrismaPlaylistSong } from '@prisma/client'

export class PrismaPlaylistSongMapper {
  static toDomain(raw: PrismaPlaylistSong): PlaylistSong {
    return PlaylistSong.create(
      {
        playlistId: raw.playlistId,
        songId: raw.songId
      },
    )
  }

  static toPrisma(playlistsong: PlaylistSong): Prisma.PlaylistSongUncheckedCreateInput {
    return {
      playlistId: playlistsong.playlistId,
      songId: playlistsong.songId,
    }
  }
}
