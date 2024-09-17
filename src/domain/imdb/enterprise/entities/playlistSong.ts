import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface PlaylistSongProps {
  playlistId: string
  songId: string
}

export class PlaylistSong extends Entity<PlaylistSongProps> {
  get playlistId() {
    return this.props.playlistId
  }

  get songId() {
    return this.props.songId
  }


  static create(props: PlaylistSongProps, id?: UniqueEntityID) {
    const playlistsong = new PlaylistSong(props)

    return playlistsong
  }
}
