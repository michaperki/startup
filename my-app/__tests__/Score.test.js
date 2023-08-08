import React from 'react';
import { render } from '@testing-library/react-native';

import Score from '../components/Score';

describe('Score Component', () => {
  it('renders the score correctly', () => {
    const { getByText } = render(<Score score={100} />);
    
    const scoreText = getByText('100');
    expect(scoreText).toBeDefined();
  });

  it('renders the title correctly', () => {
    const { getByText } = render(<Score score={100} />);
    
    const title = getByText('Score');
    expect(title).toBeDefined();
  });

  // Additional tests can be added here
  // For example: Testing the displayed score difference, etc.
});
