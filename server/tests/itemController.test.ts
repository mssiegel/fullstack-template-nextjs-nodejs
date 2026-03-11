import { Request, Response } from 'express';
import { getItems } from '../src/controllers/itemController';
import { items } from '../src/models/itemModel';

const defaultItems = [
  { id: 1, name: 'pizza' },
  { id: 2, name: 'bagels' },
];

describe('Item Controller', () => {
  const req = {} as Request;
  const res = {
    json: jest.fn(),
  } as unknown as Response;

  beforeEach(() => {
    jest.clearAllMocks();
    items.length = 0;
    items.push(...defaultItems);
  });

  it('should return an empty array when no items exist', () => {
    items.length = 0;

    getItems(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: [],
    });
  });

  it('should return default items when initialized', () => {
    getItems(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: defaultItems,
    });
  });
});
