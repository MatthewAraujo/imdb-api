import { Encrypter } from '@/domain/imdb/application/cryptography/encrypter'
import { HasherCompare } from '@/domain/imdb/application/cryptography/hasher-comparer'
import { HasherGenerator } from '@/domain/imdb/application/cryptography/hasher-generator'
import { Module } from '@nestjs/common'
import { BcryptHasher } from './bcrypt-hasher'
import { JwtEcrypter } from './jwt-encrypter'

@Module({
	providers: [
		{
			provide: Encrypter,
			useClass: JwtEcrypter,
		},
		{ provide: HasherCompare, useClass: BcryptHasher },
		{ provide: HasherGenerator, useClass: BcryptHasher },
	],
	exports: [Encrypter, HasherCompare, HasherGenerator],
})
export class CryptographyModule {}
