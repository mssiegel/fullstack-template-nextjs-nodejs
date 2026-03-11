import { Request, Response } from 'express';
import { getItems } from '../src/controllers/itemController';
import { items } from '../src/models/itemModel';

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
    // Create mock objects for Request and Response
    const req = {} as Request;
    const res = {
      json: jest.fn(),
    } as unknown as Response;

    // Ensure that our in-memory store is empty
    items.length = 0;

    // Execute our controller function
    getItems(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: [],
    });
  });

  it('should return default items when initialized', () => {
    const req = {} as Request;
    const res = {
      json: jest.fn(),
    } as unknown as Response;

    getItems(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: defaultItems,
    });
  });
});
