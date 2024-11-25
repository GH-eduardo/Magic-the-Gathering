import { Test, TestingModule } from '@nestjs/testing';
import { DecksService } from './deck.service';
import { getModelToken } from '@nestjs/mongoose';
import { Deck } from './schemas/deck.schema';
import { Card } from './schemas/card.schema';
import { UsersService } from '../../src/users/users.service';
import mongoose, { Model } from 'mongoose';
import { CreateDeckDto } from './dtos/create-deck.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Role } from '../../src/users/enums/role.enum';
import { UpdateDeckDto } from './dtos/update-deck.dto';
import { ExportDeckDto } from './dtos/export-deck.dto';

describe('DecksService', () => {
  let service: DecksService;
  let deckModel: Model<Deck>;
  let cardModel: Model<Card>;
  let usersService: UsersService;

  const mockDeckModel = {
    findOne: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    find: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    deleteOne: jest.fn(),
  };

  const mockCardModel = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
  };

  const mockUsersService = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DecksService,
        {
          provide: getModelToken(Deck.name),
          useValue: mockDeckModel,
        },
        {
          provide: getModelToken(Card.name),
          useValue: mockCardModel,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    service = module.get<DecksService>(DecksService);
    deckModel = module.get<Model<Deck>>(getModelToken(Deck.name));
    cardModel = module.get<Model<Card>>(getModelToken(Card.name));
    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should throw ConflictException if deck name already exists', async () => {
      const createDeckDto: CreateDeckDto = {
        name: 'Existing Deck',
        description: 'Test Description',
        commanderName: 'Test Commander',
        ownerId: new mongoose.Types.ObjectId() as any,
      };

      mockDeckModel.findOne.mockReturnValue({ name: 'Existing Deck' });

      await expect(service.create(createDeckDto)).rejects.toThrow(ConflictException);
      expect(mockDeckModel.findOne).toHaveBeenCalledWith({ name: createDeckDto.name });
    });
  });

  describe('findById', () => {
    it('should return a deck if found', async () => {
      const deckId = new mongoose.Types.ObjectId() as any;
      const userId = new mongoose.Types.ObjectId() as any;
      const user = { id: userId, role: Role.DEFAULT };
      const deck = { _id: deckId, owner: userId };

      mockUsersService.findById.mockResolvedValue(user);
      mockDeckModel.findById.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(deck),
      });

      const result = await service.findById(deckId, userId);

      expect(result).toEqual(deck);
      expect(mockUsersService.findById).toHaveBeenCalledWith(userId);
      expect(mockDeckModel.findById).toHaveBeenCalledWith(deckId);
    });

    it('should throw NotFoundException if deck not found', async () => {
      const deckId = new mongoose.Types.ObjectId() as any;
      const userId = new mongoose.Types.ObjectId() as any;
      const user = { id: userId, role: Role.DEFAULT };

      mockUsersService.findById.mockResolvedValue(user);
      mockDeckModel.findById.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.findById(deckId, userId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return a list of decks for a user', async () => {
      const userId = new mongoose.Types.ObjectId() as any;
      const user = { id: userId };
      const decks = [
        {
          _id: new mongoose.Types.ObjectId(),
          name: 'Deck 1',
          description: 'Description 1',
          commander: { image_normal_uri: 'image1.jpg' },
        },
      ];

      mockUsersService.findById.mockResolvedValue(user);
      mockDeckModel.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(decks),
      });

      const result = await service.findAll(userId);

      expect(result).toEqual([
        {
          deckId: decks[0]._id.toString(),
          name: decks[0].name,
          description: decks[0].description,
          commanderImage: 'image1.jpg',
        },
      ]);
      expect(mockDeckModel.find).toHaveBeenCalled();
    });
  });

  describe('updateDeck', () => {
    it('should update a deck', async () => {
      const deckId = new mongoose.Types.ObjectId() as any;
      const userId = new mongoose.Types.ObjectId() as any;
      const updateDeckDto: UpdateDeckDto = {
        name: 'Updated Deck Name',
        description: 'Updated Description',
      };
      const deck = { _id: deckId, owner: userId };

      service.findById = jest.fn().mockResolvedValue(deck);
      mockDeckModel.findByIdAndUpdate.mockResolvedValue({});

      await service.updateDeck(deckId, userId, updateDeckDto);

      expect(service.findById).toHaveBeenCalledWith(deckId, userId);
      expect(mockDeckModel.findByIdAndUpdate).toHaveBeenCalledWith(deckId, {
        ...deck,
        ...updateDeckDto,
      });
    });
  });

  describe('removeDeck', () => {
    it('should remove a deck', async () => {
      const deckId = new mongoose.Types.ObjectId() as any;
      const userId = new mongoose.Types.ObjectId() as any;
      const deck = { _id: deckId, owner: userId, id: deckId };

      service.findById = jest.fn().mockResolvedValue(deck);
      mockDeckModel.deleteOne.mockResolvedValue({ deletedCount: 1 });

      await service.removeDeck(deckId, userId);

      expect(service.findById).toHaveBeenCalledWith(deckId, userId);
      expect(mockDeckModel.deleteOne).toHaveBeenCalledWith({ _id: deckId });
    });
  });

  describe('exportDeck', () => {
    it('should export a deck', async () => {
      const deckId = 'deckId';
      const deck = {
        name: 'Deck Name',
        description: 'Deck Description',
        commander: { id: 'commanderId' },
        cards: [{ id: 'card1' }, { id: 'card2' }],
      };

      mockDeckModel.findById.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(deck),
      });

      const result = await service.exportDeck(deckId);

      expect(result).toEqual({
        name: deck.name,
        description: deck.description,
        commanderId: 'commanderId',
        cardsIds: ['card1', 'card2'],
      });
      expect(mockDeckModel.findById).toHaveBeenCalledWith(deckId);
    });

    it('should throw NotFoundException if deck not found', async () => {
      const deckId = 'deckId';

      mockDeckModel.findById.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.exportDeck(deckId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('importDeck', () => {

    it('should throw NotFoundException if commander not found', async () => {
      const importDeckDto: ExportDeckDto = {
        name: 'Imported Deck',
        description: 'Imported Description',
        commanderId: 'invalidCommanderId',
        cardsIds: ['card1', 'card2'],
      };

      mockCardModel.findOne.mockResolvedValue(null);

      await expect(service.importDeck(importDeckDto)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if some cards not found', async () => {
      const importDeckDto: ExportDeckDto = {
        name: 'Imported Deck',
        description: 'Imported Description',
        commanderId: 'commanderId',
        cardsIds: ['card1', 'card2'],
      };

      const commander = { id: 'commanderId' };
      const cards = [{ id: 'card1' }];

      mockCardModel.findOne.mockResolvedValue(commander);
      mockCardModel.find.mockResolvedValue(cards);

      await expect(service.importDeck(importDeckDto)).rejects.toThrow(NotFoundException);
    });
  });
});
