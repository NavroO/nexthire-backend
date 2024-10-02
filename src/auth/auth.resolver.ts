import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from 'src/user/dto/user.dto';
import { CreateUserInput } from 'src/user/dto/user-create.input';
import { LoginUserInput } from './dto/user-login.input';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => User)
  async signUp(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.authService.signUp(
      createUserInput.username,
      createUserInput.password,
    );
  }

  @Mutation(() => String)
  async login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    const user = await this.authService.validateUser(
      loginUserInput.username,
      loginUserInput.password,
    );
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
