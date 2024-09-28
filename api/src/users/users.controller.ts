import { Controller, Get, NotFoundException, Param, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { UserInfo } from "./dto/user-info.dto";
import { Role } from "./enums/role.enum";

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService) { }

    @Get(':id')
    async getUserById(@Req() request: Request, @Param() params): Promise<UserInfo> {
        const requestUser = request['user']

        if (requestUser.role != Role.ADMIN && requestUser.id != params.id) {
            throw new NotFoundException(`User not found`);
        }

        const user = await this.usersService.findById(params.id);
        return UserInfo.fromEntity(user);
    }

    @Get()
    async getUsers(): Promise<UserInfo[]> {
        const users = await this.usersService.findAll();
        return users.map(user => UserInfo.fromEntity(user));
    }
}