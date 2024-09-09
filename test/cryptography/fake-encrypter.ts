import type { Encrypter } from '@/domain/finder/application/cryptography/encrypter'

export class FakeEncrypter implements Encrypter {
	async encrypt(payload: Record<string, unknown>): Promise<string> {
		return JSON.stringify(payload)
	}
}
