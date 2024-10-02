import { Field, Float, InputType } from '@nestjs/graphql';
import {
  UserRole,
  JobType,
  LanguageProficiency,
  ApplicationStatus,
} from '../entities/user.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  IsArray,
  ValidateNested,
  IsDate,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @Field(() => UserRole)
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  profilePicture?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  location?: string;

  @Field(() => [WorkExperienceInput], { nullable: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkExperienceInput)
  workExperience?: WorkExperienceInput[];

  @Field(() => [EducationInput], { nullable: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationInput)
  education?: EducationInput[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @Field(() => [CertificationInput], { nullable: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CertificationInput)
  certifications?: CertificationInput[];

  @Field(() => JobPreferencesInput, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => JobPreferencesInput)
  jobPreferences?: JobPreferencesInput;

  @Field(() => [LanguageInput], { nullable: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LanguageInput)
  languages?: LanguageInput[];

  @Field(() => SocialLinksInput, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => SocialLinksInput)
  socialLinks?: SocialLinksInput;

  @Field({ defaultValue: false })
  @IsOptional()
  isPremium?: boolean;

  @Field(() => [ApplicationHistoryInput], { nullable: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ApplicationHistoryInput)
  applicationHistory?: ApplicationHistoryInput[];

  @Field(() => Float, { nullable: true })
  @IsOptional()
  jobFitScore?: number;

  @Field()
  @IsNotEmpty()
  @IsDate()
  accountCreated: Date;

  @Field()
  @IsNotEmpty()
  @IsDate()
  profileLastUpdated: Date;
}

@InputType()
class WorkExperienceInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  company: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  position: string;

  @Field()
  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  endDate?: Date;

  @Field()
  @IsNotEmpty()
  @IsString()
  responsibilities: string;
}

@InputType()
class EducationInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  institution: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  degree: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  fieldOfStudy: string;

  @Field()
  @IsNotEmpty()
  @IsDate()
  graduationDate: Date;
}

@InputType()
class CertificationInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  issuer: string;

  @Field()
  @IsNotEmpty()
  @IsDate()
  dateObtained: Date;
}

@InputType()
class JobPreferencesInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  preferredIndustry: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  preferredLocation: string;

  @Field(() => JobType)
  @IsNotEmpty()
  @IsEnum(JobType)
  preferredJobType: JobType;
}

@InputType()
class LanguageInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  language: string;

  @Field(() => LanguageProficiency)
  @IsNotEmpty()
  @IsEnum(LanguageProficiency)
  proficiency: LanguageProficiency;
}

@InputType()
class SocialLinksInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  linkedIn: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  github: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  portfolio: string;
}

@InputType()
class ApplicationHistoryInput {
  @Field()
  @IsNotEmpty()
  @IsUUID()
  jobId: string;

  @Field()
  @IsNotEmpty()
  @IsDate()
  applicationDate: Date;

  @Field(() => ApplicationStatus)
  @IsNotEmpty()
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;
}
