import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { env } from 'process';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        
        const passwordMatches = await bcrypt.compare(pass, user.password) 
        if (!passwordMatches) {
            throw new UnauthorizedException();
        }

        const payload = { email: user.email }

        return {
            accessToken: await this.jwtService.signAsync(payload)
        }
    }

    async register(email: string, username: string, password: string): Promise<any> {
        return this.usersService.create(email, username, password);
    }
}
