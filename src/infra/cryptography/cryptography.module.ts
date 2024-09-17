import { Module } from '@nestjs/common'

import { Encrypter } from '@/domain/imdb/application/cryptography/encrypter'
import { HashComparer } from '@/domain/imdb/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/imdb/application/cryptography/hash-generator'

import { BcryptHasher } from './bcrypt-hasher'
import { JwtEncrypter } from './jwt-encrypter'

@Module({
	providers: [
		{ provide: Encrypter, useClass: JwtEncrypter },
		{ provide: HashComparer, useClass: BcryptHasher },
		{ provide: HashGenerator, useClass: BcryptHasher },
	],
	exports: [Encrypter, HashComparer, HashGenerator],
})
export class CryptographyModule {}
