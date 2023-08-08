import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const NavMenu = ({ onSelect }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onSelect('overview')}>
        <Text style={styles.navItem}>overview</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect('today')}>
        <Text style={styles.navItem}>today</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect('stats')}>
        <Text style={styles.navItem}>stats</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 20,
  },
  navItem: {
    fontSize: 20,
  },
});

export default NavMenu;
