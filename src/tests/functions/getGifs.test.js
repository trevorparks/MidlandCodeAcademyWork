import getGifs from '../../functions/getGifs';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('getGifs', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('returns an array of GIFs', async () => {
    const expected = [
      {
        gif_id: 'abc123',
        title: 'funny cat',
        url: 'https://giphy.com/gifs/funny-cat',
      },
      {
        gif_id: 'def456',
        title: 'silly dog',
        url: 'https://giphy.com/gifs/silly-dog',
      },
    ];

    fetch.mockResponseOnce(JSON.stringify({
      data: expected.map(({ gif_id, title, url }) => ({
        id: gif_id,
        title,
        images: {
          original: { url },
        },
      })),
    }));

    const result = await getGifs('&q=funny cat');

    expect(result).toEqual(expected);
  });

  it('throws an error if the response is not OK', async () => {
    fetch.mockResponseOnce('', { status: 404 });

    await expect(getGifs('&q=funny cat')).rejects.toThrow('HTTP error! status 404');
  });
});