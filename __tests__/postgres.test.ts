import request from 'supertest';
import app from '../api/index';
import { sql } from '@vercel/postgres';

// Mock the sql function from @vercel/postgres
jest.mock('@vercel/postgres', () => ({
  sql: jest.fn(),
}));

describe('GET /', () => {
  it('should return a list of emission categories', async () => {
    const mockCategories = [
      { label: 'Transportation' },
      { label: 'Energy' },
      { label: 'Agriculture' },
    ];

    // Mock the SQL query response
    (sql as unknown as jest.Mock).mockResolvedValue({ rows: mockCategories });

    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body.emissionCategories).toEqual(['Transportation', 'Energy', 'Agriculture']);
  });

  it('should handle errors gracefully', async () => {
    // Mock the SQL query to throw an error
    (sql as unknown as jest.Mock).mockRejectedValue(new Error('Database error'));

    const response = await request(app).get('/');
    console.log("🚀 ~ it ~ response:", response)

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Internal Server Error');
  });
});
