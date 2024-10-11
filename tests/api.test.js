import { fetchAmiibos } from '../api.js';

// eslint-disable-next-line no-undef
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ amiibo: [{ name: 'Mario', head: '1234', tail: '5678' }] }),
  })
);

describe('fetchAmiibos', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('should fetch and return amiibos', async () => {
    const amiibos = await fetchAmiibos('https://www.amiiboapi.com/api/amiibo/');

    // Log the fetched amiibos to see the output
    // console.log('Fetched Amiibos:', amiibos);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://www.amiiboapi.com/api/amiibo/');
    expect(amiibos.length).toBeGreaterThan(0);
    expect(amiibos[0].name).toBe('Mario');
  });

  it('should throw an error when fetch fails', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('API is down')));
    await expect(fetchAmiibos('https://www.amiiboapi.com/api/amiibo/')).rejects.toThrow('Failed to fetch amiibos:');
  });
});