import { Test, TestingModule } from '@nestjs/testing';
import { DecksService } from './deck.service';
import { getModelToken } from '@nestjs/mongoose';
import { Deck } from './schemas/deck.schema';
import { Card } from './schemas/card.schema';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Types, Schema } from 'mongoose';  // Usar Types para instanciar ObjectId
import fetch from 'node-fetch';

const mockDeckModel = {
  findOne: jest.fn(),
  findById: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};

const mockCardModel = {
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

describe('DecksService', () => {
  let service: DecksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DecksService,
        { provide: getModelToken(Deck.name), useValue: mockDeckModel },
        { provide: getModelToken(Card.name), useValue: mockCardModel },
      ],
    }).compile();

    service = module.get<DecksService>(DecksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new deck with real data from Scryfall API', async () => {
      const createDeckDto = {
        name: 'Atraxa Deck',
        description: 'A deck for testing',
        commanderName: 'Atraxa, Praetors\' Voice',
      };

      mockDeckModel.findOne.mockResolvedValue(null);

      const commanderData = {
        id: 'test-commander-id',
        name: 'Atraxa, Praetors\' Voice',
        legalities: { commander: 'legal' },
        image_uris: { normal: 'https://example.com/atraxa.jpg' },
        color_identity: ['W', 'B', 'G', 'U'],
      };

      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => commanderData,
      } as any);

      const savedDeck = {
        _id: "7895ad5c9-7a8s52d-747s40",
        name: 'Atraxa Deck',
        description: 'A deck for testing',
        commander: commanderData,
        cards: [],
      };

      mockDeckModel.create.mockReturnValue(savedDeck);
      mockDeckModel.save.mockResolvedValue(savedDeck);

      const result = await service.create(createDeckDto);

      expect(result).toEqual({ message: 'Deck created successfully', deckId: savedDeck._id.toString() });
      expect(mockDeckModel.findOne).toHaveBeenCalledWith({ name: createDeckDto.name });
      expect(mockDeckModel.create).toHaveBeenCalled();
    });

    it('should throw ConflictException if the deck name already exists', async () => {
      const createDeckDto = {
        name: 'Atraxa Deck',
        description: 'A deck for testing',
        commanderName: 'Atraxa, Praetors\' Voice',
      };

      mockDeckModel.findOne.mockResolvedValue({ name: 'Atraxa Deck' });

      await expect(service.create(createDeckDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findById', () => {
    it('should return a deck by id', async () => {
      const deckId = new Schema.Types.ObjectId("7895ad5c9-7a8s52d-747s40");  // Usar ObjectId

      const mockDeck = {
        _id: deckId,
        name: 'Atraxa Deck',
        description: 'A test deck',
        commander: {
          name: 'Atraxa, Praetors\' Voice',
          image_uris: { normal: 'https://example.com/atraxa.jpg' },
        },
        cards: [],
      };

      mockDeckModel.findById.mockResolvedValue(mockDeck);

      const result = await service.findById(deckId);

      expect(result).toEqual({
        name: 'Atraxa Deck',
        description: 'A test deck',
        commander: { name: 'Atraxa, Praetors\' Voice', cardImageUri: 'https://example.com/atraxa.jpg', savedCardId: 'undefined' },
        cards: [],
      });
    });

    it('should throw NotFoundException if the deck is not found', async () => {
        const deckId = new Schema.Types.ObjectId("7895ad5c9-7a8s52d-747s40");

      mockDeckModel.findById.mockResolvedValue(null);

      await expect(service.findById(deckId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateDeck', () => {
    it('should update and return a deck', async () => {
        const deckId = new Schema.Types.ObjectId("7895ad5c9-7a8s52d-747s40");
        const updateDeckDto = { name: 'Updated Deck Name' };

      const updatedDeck = {
        _id: deckId,
        name: 'Updated Deck Name',
        description: 'Updated description',
        commander: {
          name: 'Atraxa, Praetors\' Voice',
          image_uris: { normal: 'https://example.com/atraxa.jpg' },
        },
        cards: [],
      };

      mockDeckModel.findByIdAndUpdate.mockResolvedValue(updatedDeck);

      const result = await service.updateDeck(deckId, updateDeckDto);

      expect(result).toEqual(updatedDeck);
    });

    it('should throw NotFoundException if the deck to update is not found', async () => {
        const deckId = new Schema.Types.ObjectId("7895ad5c9-7a8s52d-747s40"); 
        const updateDeckDto = { name: 'Updated Deck Name' };

      mockDeckModel.findByIdAndUpdate.mockResolvedValue(null);

      await expect(service.updateDeck(deckId, updateDeckDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeDeck', () => {
    it('should delete a deck', async () => {
      const deckId = new Types.ObjectId(); 

      mockDeckModel.findByIdAndDelete.mockResolvedValue({ _id: deckId });

      await service.removeDeck(deckId.toString());

      expect(mockDeckModel.findByIdAndDelete).toHaveBeenCalledWith(deckId.toString());
    });

    it('should throw NotFoundException if the deck to delete is not found', async () => {
      const deckId = new Types.ObjectId();  

      mockDeckModel.findByIdAndDelete.mockResolvedValue(null);

      await expect(service.removeDeck(deckId.toString())).rejects.toThrow(NotFoundException);
    });
  });

  describe('exportDeck', () => {
    it('should export a deck', async () => {
      const deckId = new Types.ObjectId();  

      const mockDeck = {
        _id: deckId,
        name: 'Atraxa Deck',
        description: 'A test deck',
        commander: {
          id: 'test-commander-id',
          name: 'Atraxa, Praetors\' Voice',
        },
        cards: [
          { id: 'card-1', name: 'Card 1' },
          { id: 'card-2', name: 'Card 2' },
        ],
      };

      mockDeckModel.findById.mockResolvedValue(mockDeck);

      const result = await service.exportDeck(deckId.toString());

      expect(result).toEqual({
        name: 'Atraxa Deck',
        description: 'A test deck',
        commanderId: 'test-commander-id',
        cardsIds: ['card-1', 'card-2'],
      });
    });

    it('should throw NotFoundException if the deck to export is not found', async () => {
      const deckId = new Types.ObjectId(); 

      mockDeckModel.findById.mockResolvedValue(null);

      await expect(service.exportDeck(deckId.toString())).rejects.toThrow(NotFoundException);
    });
  });
});
