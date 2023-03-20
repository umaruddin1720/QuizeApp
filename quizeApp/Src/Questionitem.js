//import liraries
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const {height, width} = Dimensions.get('window');

const QuestionItem = ({data, selectedOption}) => {
  return (
    <View style={{width: width}}>
      <Text
        style={{
          fontSize: 25,
          color: '#000',
          fontWeight: 'bold',
          marginHorizontal: 20,
          marginTop: 10,
        }}>
        {'Ques:' + data.quesion}
      </Text>
      <FlatList
        data={data.option}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => selectedOption(index + 1)}
              style={{
                width: '90%',
                height: 60,
                elevation: 3,
                marginTop: 20,
                backgroundColor: data.marked == index + 1 ? 'cyan' : 'white',
                marginBottom: 10,
                alignSelf: 'center',
                justifyContent: 'center',
                paddingLeft: 20,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor:
                      data.marked == index + 1 ? 'white' : 'cyan',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>
                    {index == 0
                      ? 'A'
                      : index == 1
                      ? 'B'
                      : index == 2
                      ? 'C'
                      : 'D'}
                  </Text>
                </View>
                <Text
                  style={{marginLeft: 10, fontSize: 20, fontWeight: 'bold'}}>
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default QuestionItem;
