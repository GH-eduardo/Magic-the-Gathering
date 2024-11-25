
import { Test, TestingModule } from '@nestjs/testing';
import { DecksController } from './decks.controller';
import { DecksService } from './deck.service';
import { CreateDeckDto } from './dtos/create-deck.dto';
import { UpdateDeckDto } from './dtos/update-deck.dto';
import { DetailsDeckDto } from './dtos/details-deck.dto';
import { ListDecksDto } from './dtos/list-decks.dto';
import { ExportDeckDto } from './dtos/export-deck.dto';
import { Deck } from './schemas/deck.schema';
import { HttpStatus, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { User } from '../../src/users/schemas/user.schema';
import { Role } from '../../src/users/enums/role.enum';
import { Reflector } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('DecksController', () => {
  let controller: DecksController;
  let service: DecksService;

  const mockDecksService = {
    findAll: jest.fn(),
    findAllAdmin: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    updateDeck: jest.fn(),
    removeDeck: jest.fn(),
    exportDeck: jest.fn(),
    importDeck: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      controllers: [DecksController],
      providers: [
        {
          provide: DecksService,
          useValue: mockDecksService,
        },
        Reflector,
        {
          provide: CACHE_MANAGER,
          useValue: {}, 
        },
      ],
    }).compile();

    controller = module.get<DecksController>(DecksController);
    service = module.get<DecksService>(DecksService);
  });

  const userId = new Types.ObjectId().toString();
  const mockUser: User = {
    id: new Types.ObjectId(userId),
    email: 'test@example.com',
    username: 'testuser',
    password: 'hashedpassword',
    role: Role.DEFAULT,
  };

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getDecks', () => {
    it('should return an array of decks', async () => {
      const result: ListDecksDto[] = [
        {
          deckId: '1',
          name: 'Deck 1',
          description: 'Description 1',
          commanderImage: 'image1.png',
        },
        {
          deckId: '2',
          name: 'Deck 2',
          description: 'Description 2',
          commanderImage: 'image2.png',
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.getDecks({ user: { id: userId } } as any)).toBe(result);
      expect(service.findAll).toHaveBeenCalledWith(userId);
    });
  });

  describe('getAllDecks', () => {
    it('should return an array of all decks for admin', async () => {
      const result: ListDecksDto[] = [
        {
          deckId: '1',
          name: 'Deck 1',
          description: 'Description 1',
          commanderImage: 'image1.png',
        },
        {
          deckId: '2',
          name: 'Deck 2',
          description: 'Description 2',
          commanderImage: 'image2.png',
        },
      ];

      jest.spyOn(service, 'findAllAdmin').mockResolvedValue(result);

      expect(await controller.getAllDecks()).toBe(result);
      expect(service.findAllAdmin).toHaveBeenCalled();
    });
  });

  describe('getDeckById', () => {
    it('should return a deck by id', async () => {
      const deckId = new Types.ObjectId().toString();
      const deckData: Deck = {
        id: new Types.ObjectId(deckId),
        name: 'Test Deck',
        description: 'Test Description',
        commander: { id: '1', name: 'Commander', image_normal_uri: 'image.png' } as any,
        cards: [],
        owner: mockUser,
      };

      jest.spyOn(service, 'findById').mockResolvedValue(deckData);

      const result = await controller.getDeckById({ user: { id: userId } } as any, { id: deckId });

      expect(result).toEqual(DetailsDeckDto.fromEntity(deckData));
      expect(service.findById).toHaveBeenCalledWith(deckId, userId);
    });

    it('should throw NotFoundException if deck not found', async () => {
      const deckId = new Types.ObjectId().toString();

      jest.spyOn(service, 'findById').mockRejectedValue(new NotFoundException());

      await expect(
        controller.getDeckById({ user: { id: userId } } as any, { id: deckId }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('postDeck', () => {
    it('should create a new deck', async () => {
      const createDeckDto: CreateDeckDto = {
        name: 'New Deck',
        description: 'Deck Description',
        commanderName: 'Commander',
        ownerId: new Types.ObjectId(userId),
      };

      const expectedResult = { message: 'Deck created successfully', deckId: '1' };

      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      const result = await controller.postDeck({ user: { id: userId } } as any, createDeckDto);

      expect(result).toBe(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createDeckDto);
    });
  });

  describe('updateDeck', () => {
    it('should update a deck', async () => {
      const deckId = new Types.ObjectId().toString();
      const updateDeckDto: UpdateDeckDto = { name: 'Updated Name' };

      jest.spyOn(service, 'updateDeck').mockResolvedValue(undefined);

      const responseMock = {
        sendStatus: jest.fn(),
      } as any;

      await controller.updateDeck(
        { user: { id: userId } } as any,
        responseMock,
        { id: deckId },
        updateDeckDto,
      );

      expect(service.updateDeck).toHaveBeenCalledWith(deckId, userId, updateDeckDto);
      expect(responseMock.sendStatus).toHaveBeenCalledWith(HttpStatus.NO_CONTENT);
    });

    it('should throw NotFoundException if deck not found', async () => {
      const deckId = new Types.ObjectId().toString();
      const updateDeckDto: UpdateDeckDto = { name: 'Updated Name' };

      jest.spyOn(service, 'updateDeck').mockRejectedValue(new NotFoundException());

      const responseMock = {
        sendStatus: jest.fn(),
      } as any;

      await expect(
        controller.updateDeck(
          { user: { id: userId } } as any,
          responseMock,
          { id: deckId },
          updateDeckDto,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeDeck', () => {
    it('should remove a deck', async () => {
      const deckId = new Types.ObjectId().toString();

      jest.spyOn(service, 'removeDeck').mockResolvedValue(undefined);

      const result = await controller.removeDeck({ user: { id: userId } } as any, { id: deckId });

      expect(result).toEqual({ message: `Deck with ID ${deckId} successfully removed.` });
      expect(service.removeDeck).toHaveBeenCalledWith(deckId, userId);
    });

    it('should throw NotFoundException if deck not found', async () => {
      const deckId = new Types.ObjectId().toString();

      jest.spyOn(service, 'removeDeck').mockRejectedValue(new NotFoundException());

      await expect(
        controller.removeDeck({ user: { id: userId } } as any, { id: deckId }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('exportDeck', () => {
    it('should export a deck', async () => {
      const deckId = new Types.ObjectId().toString();
      const exportData: ExportDeckDto = {
        name: 'Deck Name',
        description: 'Deck Description',
        commanderId: 'commander-id',
        cardsIds: ['card1', 'card2'],
      };

      jest.spyOn(service, 'exportDeck').mockResolvedValue(exportData);

      const result = await controller.exportDeck(deckId);

      expect(result).toBe(exportData);
      expect(service.exportDeck).toHaveBeenCalledWith(deckId);
    });

    it('should throw NotFoundException if deck not found', async () => {
      const deckId = new Types.ObjectId().toString();

      jest.spyOn(service, 'exportDeck').mockRejectedValue(new NotFoundException());

      await expect(controller.exportDeck(deckId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('importDeck', () => {
    it('should import a deck', async () => {
      const importDeckDto: ExportDeckDto = {
        name: 'Deck Name',
        description: 'Deck Description',
        commanderId: 'commander-id',
        cardsIds: ['card1', 'card2'],
      };

      const importedDeck: Deck = {
        id: new Types.ObjectId(),
        name: 'Deck Name',
        description: 'Deck Description',
        commander: null,
        cards: [],
        owner: mockUser,
      };

      jest.spyOn(service, 'importDeck').mockResolvedValue(importedDeck);

      const result = await controller.importDeck(importDeckDto);

      expect(result).toBe(importedDeck);
      expect(service.importDeck).toHaveBeenCalledWith(importDeckDto);
    });
  });
});
