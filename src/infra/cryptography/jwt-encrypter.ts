import type { Encrypter } from '@/domain/finder/application/cryptography/encrypter'
import { Injectable } from '@nestjs/common'
import type { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtEcrypter implements Encrypter {
	constructor(private jwtService: JwtService) {}

	encrypt(payload: Record<string, unknown>) {
		return this.jwtService.signAsync(payload)
	}
}
