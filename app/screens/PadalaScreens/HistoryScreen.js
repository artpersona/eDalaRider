import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {CustomHeader, HistoryItem} from '../../components';
import {usePadalaContext} from '../../shared/contexts/PadalaContext';
function HistoryScreen() {
  const {padalaHistory} = usePadalaContext();

  const renderItem = ({item}) => {
    return <HistoryItem {...item} />;
  };
  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={padalaHistory}
          renderItem={renderItem}
          contentContainerStyle={{marginTop: '5%'}}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default HistoryScreen;
