import { Request, Response } from 'express';
import { getItemById, getItems } from '../src/controllers/itemController';
import { itemRepository } from '../src/dbRepositories/itemRepository';

jest.mock('../src/dbRepositories/itemRepository', () => ({
  itemRepository: {
    getAllItems: jest.fn(),
    getById: jest.fn(),
  },
}));

const sampleItems = [
  { id: 1, name: 'pizza' },
  { id: 2, name: 'bagels' },
];

const sampleItem = sampleItems[0];

describe('Item Controller', () => {
  const mockGetAllItems = itemRepository.getAllItems as jest.Mock;
  const mockGetById = itemRepository.getById as jest.Mock;
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

  it('should return a single item when the item exists', async () => {
    mockGetById.mockResolvedValue(sampleItem);

    await getItemById({ params: { id: '1' } } as unknown as Request, res);

    expect(mockGetById).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: { item: sampleItem },
    });
  });

  it("should throw 404 when trying to get a single item that doesn't exist", async () => {
    mockGetById.mockResolvedValue(null);

    await expect(
      getItemById({ params: { id: '999' } } as unknown as Request, res),
    ).rejects.toMatchObject({
      status: 404,
      message: 'Item not found',
    });

    expect(mockGetById).toHaveBeenCalledWith(999);
  });
});
