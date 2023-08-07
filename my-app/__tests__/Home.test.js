// __tests__/Home.test.js

import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import Home from '../pages/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  </NavigationContainer>
);

describe('Home', () => {
  it('renders correctly', () => {
    const { getByText } = render(<App />);
    expect(getByText('Lifelo')).toBeTruthy();
  });

  it('navigates to Log In screen', () => {
    const { getByText } = render(<App />);
    fireEvent.press(getByText('Log In'));
    expect(getByText('Log In')).toBeTruthy();
  });

  it('navigates to Sign Up screen', () => {
    const { getByText } = render(<App />);
    fireEvent.press(getByText('Sign Up'));
    expect(getByText('Sign Up')).toBeTruthy();
  });

  it('navigates to Scratch screen', () => {
    const { getByText } = render(<App />);
    fireEvent.press(getByText('Scratch'));
    expect(getByText('Scratch')).toBeTruthy();
  });
});

