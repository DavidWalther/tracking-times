// eslint-disable-next-line no-unused-vars
import startDownload from 'data/fileDownload';

describe('Download', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  test('', () => {});
});
