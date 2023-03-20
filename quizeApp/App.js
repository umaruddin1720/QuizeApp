//import liraries
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import {Quize} from './Src/QuizeQuestion';
import QuestionItem from './Src/Questionitem';

const {width, height} = Dimensions.get('window');

// create a component
const App = () => {
  const [current, setCurrent] = useState(1);
  const [question, setQuestion] = useState(Quize);
  const [modalVisible, setModalVisible] = useState(false);

  const ListRef = useRef();

  const onSelectOption = (index, x) => {
    const tempData = question;
    tempData.map((item, ind) => {
      if (index == ind) {
        item.marked = x;
      }
      let temp = [];
      tempData.map(item => {
        temp.push(item);
      });
      setQuestion(temp);
    });
  };

  const getScore = () => {
    let marks = 0;
    question.map(item => {
      if (item.marked !== -1) {
        marks = marks + 5;
      }
    });
    return marks;
  };

  const onReset = () => {
    const tempData = question;
    tempData.map((item, ind) => {
      item.marked = -1;
    });
    let temp = [];
    tempData.map(item => {
      temp.push(item);
    });
    setQuestion(temp);
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginTop: 20,
        }}>
        <Text style={{marginLeft: 20, fontSize: 22, color: '#000'}}>
          Computer Questions: {current + '/' + question.length}
        </Text>
        <TouchableOpacity
          onPress={() => {
            onReset();
            ListRef.current.scrollToIndex({animated: true, index: 0});
          }}>
          <Text style={{fontSize: 22, color: 'black', fontWeight: 'bold'}}>
            Reset
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        ref={ListRef}
        onScroll={e => {
          const x = e.nativeEvent.contentOffset.x / width;
          setCurrent((x + 1).toFixed(0));
        }}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={question}
        renderItem={({item, index}) => {
          return (
            <QuestionItem
              data={item}
              selectedOption={x => {
                onSelectOption(index, x);
              }}
            />
          );
        }}
      />

      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <TouchableOpacity
          style={{
            width: 100,
            height: 50,
            backgroundColor: current > 1 ? 'cyan' : 'gray',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            marginBottom: 50,
          }}
          onPress={() => {
            if (current > 1) {
              ListRef.current.scrollToIndex({
                animated: true,
                index: parseInt(current - 2),
              });
            }
          }}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
            Previous
          </Text>
        </TouchableOpacity>
        {current > 9 ? (
          <TouchableOpacity
            style={{
              width: 100,
              height: 50,
              backgroundColor: 'green',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              marginBottom: 30,
            }}
            onPress={() => {
              setModalVisible(true);
            }}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
              Submit
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              width: 100,
              height: 50,
              backgroundColor: 'cyan',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              marginBottom: 30,
            }}
            onPress={() => {
              if (question[current - 1].marked !== -1) {
                if (current < 10) {
                  ListRef.current.scrollToIndex({
                    animated: true,
                    index: current,
                  });
                }
              }
            }}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
              Next
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              width: '90%',
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontSize: 26,
                textAlign: 'center',
                marginTop: 20,
                fontWeight: 'bold',
              }}>
              Text Score
            </Text>
            <Text
              style={{
                fontSize: 36,
                textAlign: 'center',
                marginTop: 20,
                color: 'green',
              }}>
              {getScore()}
            </Text>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 100,
                    padding: 10,
                    marginVertical: 25,
                    borderRadius: 10,
                    fontWeight: 'bold',
                    backgroundColor: 'cyan',
                  }}
                  onPress={() => {
                    setModalVisible(false);
                  }}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default App;
