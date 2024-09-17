import { randomUUID } from 'node:crypto'
import type { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemorySongsRepository } from 'test/repositories/in-memory-songs-repository'
import { RegisterSongUseCase } from './register-song-use-case'

let inMemorySongsRepository: InMemorySongsRepository
let fakeHasher: FakeHasher

let sut: RegisterSongUseCase

describe('Register Song', () => {
	beforeEach(() => {
		inMemorySongsRepository = new InMemorySongsRepository()

		sut = new RegisterSongUseCase(inMemorySongsRepository)
	})

	it('should be able to register a new song', async () => {
		const result = await sut.execute({
			durationMs: 100,
			name: 'Hotel California',
			previewUrl: 'https://mortified-layer.biz',
			spotifySongId: randomUUID(),
		})

		expect(result.isRight()).toBe(true)
		expect(result.value).toEqual({
			song: inMemorySongsRepository.items[0],
		})
	})
})
