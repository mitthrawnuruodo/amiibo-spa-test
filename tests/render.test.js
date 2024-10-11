import { renderAmiiboList, renderAmiiboDetails } from '../main.js';

describe('renderAmiiboList', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="listView"></div>';
  });

  it('should render amiibo list', () => {
    const amiibos = [{ name: 'Mario', image: 'mario.png', head: '1234', tail: '5678' }];
    renderAmiiboList(amiibos);

    const listView = document.getElementById('listView');
    expect(listView.innerHTML).toContain('Mario');
    expect(listView.querySelectorAll('.amiibo-item').length).toBe(1);
  });
});

describe('renderAmiiboDetails', () => {
  beforeEach(() => {
    // Set up the DOM elements needed by renderAmiiboDetails
    document.body.innerHTML = `
      <div id="listView" class="amiibo-list"></div>
      <div id="detailsView" class="amiibo-details hidden"></div>
    `;
  });

  it('should render amiibo details in the detailsView element', () => {
    const mockAmiibo = {
      name: 'Mario',
      image: 'https://example.com/mario.png',
      gameSeries: 'Super Mario',
      character: 'Mario',
      type: 'Figure',
    };

    renderAmiiboDetails(mockAmiibo);

    // Get the detailsView element
    const detailsView = document.getElementById('detailsView');

    // Verify that the detailsView element is not hidden
    expect(detailsView.classList.contains('hidden')).toBe(false);

    // Verify that the rendered details contain the expected data
    expect(detailsView.innerHTML).toContain('<h2>Mario</h2>');
    expect(detailsView.innerHTML).toContain('<img src="https://example.com/mario.png" alt="Mario">');
    expect(detailsView.innerHTML).toContain('<strong>Game Series:</strong> Super Mario');
    expect(detailsView.innerHTML).toContain('<strong>Character:</strong> Mario');
    expect(detailsView.innerHTML).toContain('<strong>Type:</strong> Figure');
  });

  it('should render a back button with the correct functionality', () => {
    const mockAmiibo = {
      name: 'Mario',
      image: 'https://example.com/mario.png',
      gameSeries: 'Super Mario',
      character: 'Mario',
      type: 'Figure',
    };

    renderAmiiboDetails(mockAmiibo);

    const backButton = document.getElementById('backButton');
    expect(backButton).not.toBeNull(); // Ensure back button exists

    // Simulate clicking the back button
    backButton.click();

    // Verify that listView is visible and detailsView is hidden after clicking back
    const listView = document.getElementById('listView');
    const detailsView = document.getElementById('detailsView');

    expect(listView.classList.contains('hidden')).toBe(false);
    expect(detailsView.classList.contains('hidden')).toBe(true);
  });
}); // Ends describe('renderAmiiboDetails')