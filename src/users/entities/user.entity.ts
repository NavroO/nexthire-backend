import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

export enum UserRole {
  JOB_SEEKER = 'job_seeker',
  EMPLOYER = 'employer',
  ADMIN = 'admin',
}

export enum JobType {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  CONTRACT = 'contract',
  FREELANCE = 'freelance',
}

export enum LanguageProficiency {
  BASIC = 'basic',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  NATIVE = 'native',
}

export enum ApplicationStatus {
  APPLIED = 'applied',
  INTERVIEWED = 'interviewed',
  REJECTED = 'rejected',
  HIRED = 'hired',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ nullable: true })
  location: string;

  @Column('json', { nullable: true })
  workExperience: {
    company: string;
    position: string;
    startDate: Date;
    endDate: Date;
    responsibilities: string;
  }[];

  @Column('json', { nullable: true })
  education: {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    graduationDate: Date;
  }[];

  @Column('simple-array', { nullable: true })
  skills: string[];

  @Column('json', { nullable: true })
  certifications: {
    name: string;
    issuer: string;
    dateObtained: Date;
  }[];

  @Column('json', { nullable: true })
  jobPreferences: {
    preferredIndustry: string;
    preferredLocation: string;
    preferredJobType: JobType;
  };

  @Column('json', { nullable: true })
  languages: {
    language: string;
    proficiency: LanguageProficiency;
  }[];

  @Column('json', { nullable: true })
  socialLinks: {
    linkedIn: string;
    github: string;
    portfolio: string;
  };

  @Column({ default: false })
  isPremium: boolean;

  @Column('json', { nullable: true })
  applicationHistory: {
    jobId: string;
    applicationDate: Date;
    status: ApplicationStatus;
  }[];

  @Column('float', { nullable: true })
  jobFitScore: number;

  @Column()
  accountCreated: Date;

  @Column()
  profileLastUpdated: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
