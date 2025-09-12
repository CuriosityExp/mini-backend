import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

/**
 * DTO for creating a new AppUser.
 * Used in the POST request body for user creation/signup.
 */
export class CreateAppUserDto {
  @IsString({ message: 'Username must be a string.' })
  @IsNotEmpty({ message: 'Username is required.' })
  @MinLength(3, { message: 'Username must be at least 3 characters long.' })
  @MaxLength(50, { message: 'Username cannot be longer than 50 characters.' })
  readonly username: string;

  @IsEmail({}, { message: 'Please provide a valid email address.' })
  @IsNotEmpty({ message: 'Email is required.' })
  readonly email: string;

  @IsString({ message: 'Password must be a string.' })
  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  readonly password: string;
}
