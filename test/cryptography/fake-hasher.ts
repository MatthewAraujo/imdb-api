import type { HasherCompare } from '@/domain/finder/application/cryptography/hasher-comparer'
import type { HasherGenerator } from '@/domain/finder/application/cryptography/hasher-generator'

export class FakeHasher implements HasherGenerator, HasherCompare {
	async hash(plain: string): Promise<string> {
		return plain.concat('-hashed')
	}

	async compare(plain: string, hash: string): Promise<boolean> {
		return plain.concat('-hashed') === hash
	}
}
