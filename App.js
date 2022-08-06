import { Button, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, {useState} from 'react'

import { StatusBar } from 'expo-status-bar';

export default function App() {

  const [item, setItem] = useState('');
  const [itemList, setItemList] = useState([]);
  const [itemSelected, setItemSelected] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const onChangeText = (text)=>{
    setItem(text);
  }

  const addItem =()=>{
    if(item.length > 0){
       setItemList([
      ...itemList, {
        id: Math.random().toString(),
        value: item
      }
    ])
    setItem('');
    }
   
  }

  const onDeleteItem = (id) => {
    setItemList(currentItems => currentItems.filter(item => item.id !== id));
    setItemSelected({});
    setModalVisible(!modalVisible);
  }
  const onHandlerModal = (id) => {
    setItemSelected(itemList.find(item => item.id === id));
    setModalVisible(!modalVisible);
  }
  const renderItem = ({item})=>(
    <View >
            <Text style={styles.input2}>{item.value}</Text>
            <TouchableOpacity onPress={() => onDeleteItem(item.id)}>
        <Text style={styles.delete}>X</Text>
      </TouchableOpacity>
            
          </View>
  )
    
  
   
  
  return (
  
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput placeholder='Item' 
        style={styles.input} 
        value={item}
        onChangeText={onChangeText}
        />
        <Button color='#88A0A8' title='+'
        onPress={addItem}
        disabled={item === ''}
        />
      </View>
      <View style={styles.screen2}>
        <FlatList
        data={itemList}
        renderItem={renderItem}
        keyExtractor={(item)=> item.id}
        />
         
      

      </View>
      <Modal animationType='slide' visible={modalVisible}>
      <View style={styles.modalContentContainer}>
        <Text style={styles.modalTitle}>Detalle de la lista</Text>
      </View>
      <View style={styles.modalContentContainer}>
        <Text style={styles.modalMessage}> ¿Estás seguro que deseas eliminar?</Text>
      </View>
      <View style={styles.modalContentContainer}>
        <Text style={styles.modalItem}>{itemSelected.value}</Text>
      </View>
      <View style={styles.modalButton}>
        <Button title='Eliminar' onPress={() => onDeleteItem(itemSelected.id)} color='#7D8CC4' />
        <Button title='Cancelar' onPress={() => setModalVisible(!modalVisible)} color='#cccccc' />
      </View>
     </Modal>
      
    </View>
   
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50   
    
  },
  screen2:{
    marginTop: 30, 
    borderColor:'black', 
    borderWidth: 1,
    padding: 10,
  },
  inputContainer:{
    flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
  },
  input: {
    borderColor:'black', 
    borderWidth: 1,
    width: 200,
    padding: 5,
    color: '#546A76'
  },
   input2: {
    borderColor:'black', 
    borderWidth: 1,
    width: 200,
    padding: 5,
    marginTop: 15,
    color: '#546A76'
  },
  delete: {
    color : '#ccc',
    fontSize: 18,
  },
  modalContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  modalTitle: {
    fontSize: 16,
  },
  modalMessage: {
    fontSize: 14,
  },
  modalItem: {
    fontSize: 15,
    color: '#7D8CC4',
    fontWeight: 'bold',
  },
  modalButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
  },
});
