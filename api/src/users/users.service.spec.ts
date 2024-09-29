import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Role } from './enums/role.enum';
import { Model, Types } from 'mongoose';

jest.mock('bcrypt');

describe('UsersService', () => {
  let service: UsersService;
  let userModel: Model<User>;

  const mockUserModel = {
    findOne: jest.fn(),
    findById: jest.fn(),
    find: jest.fn(),
    create: jest.fn().mockImplementation((user) => ({
      ...user,
      save: jest.fn().mockResolvedValue(user),
    })),
  };

  beforeEach(async () => {
    (bcrypt.hash as jest.Mock).mockClear();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findByEmail', () => {
    it('should return a user if email is found', async () => {
      const email = 'test@teste.com';
      const user = { email, username: 'testuser', role: Role.DEFAULT };
      mockUserModel.findOne.mockResolvedValue(user);

      const result = await service.findByEmail(email);
      expect(result).toEqual(user);
      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email });
    });

    it('should return null if email is not found', async () => {
      const email = 'notfound@teste.com';
      mockUserModel.findOne.mockResolvedValue(null);

      const result = await service.findByEmail(email);
      expect(result).toBeNull();
      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email });
    });
  });

  describe('create', () => {
   

    it('should throw ConflictException if user already exists', async () => {
      const email = 'test@teste.com';
      mockUserModel.findOne.mockResolvedValue({ email });

      await expect(
        service.create(email, 'username', 'password', Role.DEFAULT),
      ).rejects.toThrow(ConflictException);
      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email });
    });
  });

  describe('findById', () => {
    it('should return a user if ID is found', async () => {
      const userId = new Types.ObjectId() as any;
      const user = { email: 'test@teste.com', username: 'testuser', role: Role.DEFAULT };
      mockUserModel.findById.mockResolvedValue(user);

      const result = await service.findById(userId);
      expect(result).toEqual(user);
      expect(mockUserModel.findById).toHaveBeenCalledWith(userId);
    });

    it('should return null if ID is not found', async () => {
      const userId = new Types.ObjectId() as any;
      mockUserModel.findById.mockResolvedValue(null);

      const result = await service.findById(userId);
      expect(result).toBeNull();
      expect(mockUserModel.findById).toHaveBeenCalledWith(userId);
    });
  });

  describe('findAll', () => {
    it('should return a list of users', async () => {
      const users = [
        { email: 'test1@teste.com', username: 'user1', role: Role.DEFAULT },
        { email: 'test2@teste.com', username: 'user2', role: Role.ADMIN },
      ];
      mockUserModel.find.mockResolvedValue(users);

      const result = await service.findAll();
      expect(result).toEqual(users);
      expect(mockUserModel.find).toHaveBeenCalled();
    });
  });
});
