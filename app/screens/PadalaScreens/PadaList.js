import React, {useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {PadalaItem, Empty} from '../../components';
import {usePadalaContext} from '../../shared/contexts/PadalaContext';
function PadaList({route, navigation}) {
  const {padalaOrders, fetchPadalas} = usePadalaContext();

  useEffect(() => {
    fetchPadalas();
  }, [navigation, route]);

  const renderItem = ({item}) => (
    <PadalaItem
      item={item}
      key={item?.id}
      onPress={() => navigation.navigate('MapScreen', {item: item})}
    />
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={padalaOrders}
        renderItem={renderItem}
        ListEmptyComponent={<Empty message={'No Padala Orders'} width="80%" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default PadaList;
