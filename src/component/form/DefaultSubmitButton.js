import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const DefaultSubmitButton = (props: BasicButtonProps) => {
  if (props.disable) {
    return <Text>Oh no</Text>;
  }
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.outer}>
      <Text style={styles.inner}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outer: {
    marginTop: 8,
    marginBottom: 12,
    marginLeft: 6,
    marginRight: 6,
    borderRadius: 7,
    height: 50,
    backgroundColor: '#efb08c',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  inner: {
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

type BasicButtonProps = {
  title: string,
  onPress: () => any,
  disable: boolean,
};

export { DefaultSubmitButton };
