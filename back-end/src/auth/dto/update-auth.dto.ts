import { PartialType } from '@nestjs/mapped-types';
import { signupDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(signupDto) {}
