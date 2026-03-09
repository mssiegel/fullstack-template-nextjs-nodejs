import { Request, Response } from 'express';
import { getItems } from '../src/controllers/itemController';
import { items } from '../src/models/item';

const defaultItems = [
  { id: 1, name: 'pizza' },
  { id: 2, name: 'bagels' },
];

describe('Item Controller', () => {
  beforeEach(() => {
    items.length = 0;
    items.push(...defaultItems);
  });

  it('should return an empty array when no items exist', () => {
    // Create mock objects for Request, Response, and NextFunction
    const req = {} as Request;
    const res = {
      json: jest.fn(),
    } as unknown as Response;

    // Ensure that our in-memory store is empty
    items.length = 0;

    // Execute our controller function
    getItems(req, res, jest.fn());

    // Expect that res.json was called with an empty array
    expect(res.json).toHaveBeenCalledWith([]);
  });

  it('should return default items when initialized', () => {
    const req = {} as Request;
    const res = {
      json: jest.fn(),
    } as unknown as Response;

    getItems(req, res, jest.fn());

    expect(res.json).toHaveBeenCalledWith(defaultItems);
  });
});
