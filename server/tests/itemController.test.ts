import { Request, Response } from 'express';
import { getItems } from '../src/controllers/itemController';
import { itemRepository } from '../src/dbRepositories/itemRepository';

jest.mock('../src/dbRepositories/itemRepository', () => ({
  itemRepository: {
    getAllItems: jest.fn(),
  },
}));

const sampleItems = [
  { id: 1, name: 'pizza' },
  { id: 2, name: 'bagels' },
];

describe('Item Controller', () => {
  const mockGetAllItems = itemRepository.getAllItems as jest.Mock;
  const req = {} as Request;
  const res = {
    json: jest.fn(),
  } as unknown as Response;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return an empty array when no items exist', async () => {
    mockGetAllItems.mockResolvedValue([]);

    await getItems(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: { items: [] },
    });
  });

  it('should return all items when items exist', async () => {
    mockGetAllItems.mockResolvedValue(sampleItems);

    await getItems(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: { items: sampleItems },
    });
  });
});
