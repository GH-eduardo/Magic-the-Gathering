import { Test, TestingModule } from '@nestjs/testing';
import { DecksController } from './decks.controller';
import { DecksService } from './deck.service';
import { CreateDeckDto } from './dtos/create-deck.dto';
import { UpdateDeckDto } from './dtos/update-deck.dto';
import { DetailsDeckDto } from './dtos/details-deck.dto';
import { ListDecksDto } from './dtos/list-decks.dto';
import { ExportDeckDto } from './dtos/ExportDeckDto.dto';
import { Deck } from './schemas/deck.schema';
import { NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';

describe('DecksController', () => {
  let controller: DecksController;
  let service: DecksService;

  const mockDeckService = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    updateDeck: jest.fn(),
    removeDeck: jest.fn(),
    exportDeck: jest.fn(),
    importDeck: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DecksController],
      providers: [
        {
          provide: DecksService,
          useValue: mockDeckService,
        },
      ],
    }).compile();

    controller = module.get<DecksController>(DecksController);
    service = module.get<DecksService>(DecksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getDecks', () => {
    it('should return an array of decks', async () => {
      const result: ListDecksDto[] = [
        { deckId: '1', name: 'Deck 1', description: 'Test Deck 1', commanderImage: '' },
        { deckId: '2', name: 'Deck 2', description: 'Test Deck 2', commanderImage: '' },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.getDecks()).toBe(result);
    });
  });

  describe('getDeckById', () => {
    it('should return a deck by id', async () => {
      const deckId = new Types.ObjectId().toString();
      const result: DetailsDeckDto = {
        name: 'Test Deck',
        description: 'Test Description',
        commander: { name: 'Atraxa', cardImageUri: '', savedCardId: '1' },
        cards: [],
      };

      jest.spyOn(service, 'findById').mockResolvedValue(result);

      expect(await controller.getDeckById({ id: deckId })).toBe(result);
    });

    it('should throw NotFoundException if deck is not found', async () => {
      const deckId = new Types.ObjectId().toString();

      jest.spyOn(service, 'findById').mockRejectedValue(new NotFoundException());

      await expect(controller.getDeckById({ id: deckId })).rejects.toThrow(NotFoundException);
    });
  });

  describe('postDeck', () => {
    it('should create a new deck', async () => {
      const createDeckDto: CreateDeckDto = {
        name: 'New Deck',
        description: 'Description of new deck',
        commanderName: 'Atraxa',
      };

      const result = { message: 'Deck created successfully', deckId: '1' };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.postDeck(createDeckDto)).toBe(result);
    });
  });

  describe('updateDeck', () => {
    it('should update a deck by id', async () => {
      const deckId = new Types.ObjectId().toString();
      const updateDeckDto: UpdateDeckDto = { name: 'Updated Deck Name' };
      const updatedDeck: Deck = {
        _id: new Types.ObjectId(),
        name: 'Updated Deck Name',
        description: 'Updated Description',
        commander: null,
        cards: [],
      } as Deck;

      jest.spyOn(service, 'updateDeck').mockResolvedValue(updatedDeck);

      expect(await controller.updateDeck({ id: deckId }, updateDeckDto)).toBe(updatedDeck);
    });

    it('should throw NotFoundException if deck to update is not found', async () => {
      const deckId = new Types.ObjectId().toString();
      const updateDeckDto: UpdateDeckDto = { name: 'Updated Deck Name' };

      jest.spyOn(service, 'updateDeck').mockRejectedValue(new NotFoundException());

      await expect(controller.updateDeck({ id: deckId }, updateDeckDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeDeck', () => {
    it('should remove a deck by id', async () => {
      const deckId = new Types.ObjectId().toString();

      jest.spyOn(service, 'removeDeck').mockResolvedValue();

      expect(await controller.removeDeck(deckId)).toEqual({ message: `Deck with ID ${deckId} successfully removed.` });
    });

    it('should throw NotFoundException if deck to remove is not found', async () => {
      const deckId = new Types.ObjectId().toString();

      jest.spyOn(service, 'removeDeck').mockRejectedValue(new NotFoundException());

      await expect(controller.removeDeck(deckId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('exportDeck', () => {
    it('should export a deck by id', async () => {
      const deckId = new Types.ObjectId().toString();
      const result: ExportDeckDto = {
        name: 'Test Deck',
        description: 'Test Description',
        commanderId: 'test-commander-id',
        cardsIds: ['card-1', 'card-2'],
      };

      jest.spyOn(service, 'exportDeck').mockResolvedValue(result);

      expect(await controller.exportDeck(deckId)).toBe(result);
    });

    it('should throw NotFoundException if deck to export is not found', async () => {
      const deckId = new Types.ObjectId().toString();

      jest.spyOn(service, 'exportDeck').mockRejectedValue(new NotFoundException());

      await expect(controller.exportDeck(deckId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('importDeck', () => {
    it('should import a deck', async () => {
      const importDeckDto: ExportDeckDto = {
        name: 'Test Deck',
        description: 'Test Description',
        commanderId: 'test-commander-id',
        cardsIds: ['card-1', 'card-2'],
      };

      const importedDeck: Deck = {
        _id: new Types.ObjectId(),
        name: 'Test Deck',
        description: 'Test Description',
        commander: null,
        cards: [],
      } as Deck;

      jest.spyOn(service, 'importDeck').mockResolvedValue(importedDeck);

      expect(await controller.importDeck(importDeckDto)).toBe(importedDeck);
    });
  });
});
