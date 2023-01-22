import { JwtModule } from "@nestjs/jwt/dist";
import { Module } from "@nestjs/common"
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserService } from "../user/services/user.service";
import { UserRepository } from "../user/user.repository";
import { DatabaseModule } from "../prisma/database.module";
import { AuthStrategy } from "./auth.strategy";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: "jwt"}),
        JwtModule.register({
            secret: process.env.SECRET_KEY,
            signOptions: { expiresIn: "24h" },
        }),
        ConfigModule.forRoot(),
        DatabaseModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, UserRepository, AuthStrategy],
    exports: [AuthStrategy, AuthService]
})

export class AuthModule {}