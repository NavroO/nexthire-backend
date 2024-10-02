import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
    }),
    JwtModule.register({
      secret: 'secretKey', // TODO: Replace with env variable
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
