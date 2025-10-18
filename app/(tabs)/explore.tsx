// import { Item, useStore } from '@/utils/store';
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import React, { useState } from 'react';
// import { Alert, Button, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
// export default function ExploreScreen() {
//   const {
//     catalog,
//     addCatalogItem,
//     updateCatalogItem,
//     deleteCatalogItem,
//     clearAllMealsData,
//     clearAllData,
//   } = useStore();

//   const [newName, setNewName] = useState('');
//   const [newPrice, setNewPrice] = useState('');
//   const [editingItem, setEditingItem] = useState<Item | null>(null);

//   const onAddNewItem = async () => {
//     if (!newName.trim() || isNaN(Number(newPrice)) || Number(newPrice) <= 0) {
//       alert('Enter valid name and price');
//       return;
//     }
//     await addCatalogItem({
//       id: Date.now(),
//       name: newName.trim(),
//       price: Number(newPrice),
//     });
//     setNewName('');
//     setNewPrice('');
//   };

//   const onUpdateItem = async () => {
//     if (!editingItem) return;
//     if (!editingItem.name.trim() || editingItem.price <= 0) {
//       alert('Enter valid name and price');
//       return;
//     }
//     await updateCatalogItem(editingItem);
//     setEditingItem(null);
//   };

//   const onDeleteItem = async (id: number) => {
//     Alert.alert('Confirm Delete', 'Delete this catalog item?', [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Delete',
//         style: 'destructive',
//         onPress: () => deleteCatalogItem(id),
//       },
//     ]);
//   };

//   const renderItem = ({ item }: { item: Item }) => {
//     if (editingItem?.id === item.id) {
//       return (
//         <View style={{ marginVertical: 8 }}>
//           <TextInput
//             value={editingItem.name}
//             onChangeText={(name) => setEditingItem({ ...editingItem, name })}
//             placeholder="Name"
//             style={{ backgroundColor: '#333', color: 'white', padding: 8 }}
//           />
//           <TextInput
//             value={editingItem.price.toString()}
//             onChangeText={(price) =>
//               setEditingItem({ ...editingItem, price: Number(price) })
//             }
//             placeholder="Price"
//             keyboardType="numeric"
//             style={{ backgroundColor: '#333', color: 'white', padding: 8, marginTop: 4 }}
//           />
//           <Button title="Save" onPress={onUpdateItem} />
//           <Button title="Cancel" onPress={() => setEditingItem(null)} color="gray" />
//         </View>
//       );
//     }

//     return (
//       <TouchableOpacity
//         onPress={() => setEditingItem(item)}
//         style={{ padding: 12, backgroundColor: '#222', marginVertical: 4 }}
//       >
//         <Text style={{ color: 'white' }}>
//           {item.name} - ₹{item.price.toFixed(2)}
//         </Text>
//         <Button title="Delete" onPress={() => onDeleteItem(item.id)} color="red" />
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: '#121212', padding: 16 }}>
//       {/* <Text style={{ color: 'white', fontSize: 20, marginBottom: 12 }}>
//       <MaterialIcons name="restaurant-menu" size={24} color="white" />
//       Extra Items
//       </Text> */}
//       <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
//         <MaterialIcons name="restaurant-menu" size={24} color="white" style={{ marginRight: 8 }} />
//         <Text style={{ color: 'white', fontSize: 20 }}>
//           Extra Items
//         </Text>
//       </View>
//       <FlatList
//         data={catalog}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id.toString()}
//       />

//       <View style={{ marginTop: 16 }}>
//         <TextInput
//           placeholder="New Item Name"
//           placeholderTextColor="#888"
//           value={newName}
//           onChangeText={setNewName}
//           style={{ backgroundColor: '#333', color: 'white', padding: 8, marginBottom: 8 }}
//         />
//         <TextInput
//           placeholder="New Item Price"
//           placeholderTextColor="#888"
//           value={newPrice}
//           onChangeText={setNewPrice}
//           keyboardType="numeric"
//           style={{ backgroundColor: '#333', color: 'white', padding: 8, marginBottom: 8 }}
//         />
//         <Button title="Add New Item" onPress={onAddNewItem} color="#2e7d32" />
//       </View>

//       <View style={{ marginTop: 32 }}>
//         <Button
//           title="Clear All Meals Data"
//           color="#f39c12"
//           onPress={() => {
//             Alert.alert('Confirm', 'Clear all meals data?', [
//               { text: 'Cancel', style: 'cancel' },
//               {
//                 text: 'Yes',
//                 onPress: clearAllMealsData,
//                 style: 'destructive',
//               },
//             ]);
//           }}
//         />
//         <View style={{ height: 12 }} />
//         <Button
//           title="Clear All Data (Catalog + Meals)"
//           color="#e74c3c"
//           onPress={() => {
//             Alert.alert('Confirm', 'Clear ALL data including catalog?', [
//               { text: 'Cancel', style: 'cancel' },
//               {
//                 text: 'Yes',
//                 onPress: clearAllData,
//                 style: 'destructive',
//               },
//             ]);
//           }}
//         />
//       </View>
//     </View>
//   );
// }



import { Item, useStore } from '@/utils/store';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const ADMIN_PIN = '1234';

export default function ExploreScreen() {
  const {
    catalog,
    addCatalogItem,
    updateCatalogItem,
    deleteCatalogItem,
    clearAllMealsData,
    clearAllData,
  } = useStore();

  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  // For PIN modal
  const [pinModalVisible, setPinModalVisible] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pendingAction, setPendingAction] = useState<null | 'clearMeals' | 'clearAll'>(null);

  const onAddNewItem = async () => {
    if (!newName.trim() || isNaN(Number(newPrice)) || Number(newPrice) <= 0) {
      alert('Enter valid name and price');
      return;
    }
    await addCatalogItem({
      id: Date.now(),
      name: newName.trim(),
      price: Number(newPrice),
    });
    setNewName('');
    setNewPrice('');
  };

  const onUpdateItem = async () => {
    if (!editingItem) return;
    if (!editingItem.name.trim() || editingItem.price <= 0) {
      alert('Enter valid name and price');
      return;
    }
    await updateCatalogItem(editingItem);
    setEditingItem(null);
  };

  const onDeleteItem = async (id: number) => {
    Alert.alert('Confirm Delete', 'Delete this catalog item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteCatalogItem(id),
      },
    ]);
  };

  // Show PIN modal and store action to do after PIN success
  const askPinAndPerform = (action: 'clearMeals' | 'clearAll') => {
    setPendingAction(action);
    setPinInput('');
    setPinModalVisible(true);
  };

  const onConfirmPin = () => {
    if (pinInput === ADMIN_PIN) {
      setPinModalVisible(false);
      if (pendingAction === 'clearMeals') {
        clearAllMealsData();
      } else if (pendingAction === 'clearAll') {
        clearAllData();
      }
      setPendingAction(null);
      setPinInput('');
    } else {
      Alert.alert('Error', 'Incorrect PIN. Operation cannot be performed.');
      setPinInput('');
    }
  };

  const renderItem = ({ item }: { item: Item }) => {
    if (editingItem?.id === item.id) {
      return (
        <View style={{ marginVertical: 8 }}>
          <TextInput
            value={editingItem.name}
            onChangeText={(name) => setEditingItem({ ...editingItem, name })}
            placeholder="Name"
            style={{ backgroundColor: '#333', color: 'white', padding: 8 }}
          />
          <TextInput
            value={editingItem.price.toString()}
            onChangeText={(price) =>
              setEditingItem({ ...editingItem, price: Number(price) })
            }
            placeholder="Price"
            keyboardType="numeric"
            style={{ backgroundColor: '#333', color: 'white', padding: 8, marginTop: 4 }}
          />
          <Button title="Save" onPress={onUpdateItem} />
          <Button title="Cancel" onPress={() => setEditingItem(null)} color="gray" />
        </View>
      );
    }

    return (
      <TouchableOpacity
        onPress={() => setEditingItem(item)}
        style={{ padding: 12, backgroundColor: '#222', marginVertical: 4 }}
      >
        <Text style={{ color: 'white' }}>
          {item.name} - ₹{item.price.toFixed(2)}
        </Text>
        <Button title="Delete" onPress={() => onDeleteItem(item.id)} color="red" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#121212', padding: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <MaterialIcons
          name="restaurant-menu"
          size={24}
          color="white"
          style={{ marginRight: 8 }}
        />
        <Text style={{ color: 'white', fontSize: 20 }}>Extra Items</Text>
      </View>
      <FlatList
        data={catalog}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <View style={{ marginTop: 16 }}>
        <TextInput
          placeholder="New Item Name"
          placeholderTextColor="#888"
          value={newName}
          onChangeText={setNewName}
          style={{ backgroundColor: '#333', color: 'white', padding: 8, marginBottom: 8 }}
        />
        <TextInput
          placeholder="New Item Price"
          placeholderTextColor="#888"
          value={newPrice}
          onChangeText={setNewPrice}
          keyboardType="numeric"
          style={{ backgroundColor: '#333', color: 'white', padding: 8, marginBottom: 8 }}
        />
        <Button title="Add New Item" onPress={onAddNewItem} color="#2e7d32" />
      </View>

      <View style={{ marginTop: 32 }}>
        <Button
          title="Clear All Meals Data"
          color="#f39c12"
          onPress={() => askPinAndPerform('clearMeals')}
        />
        <View style={{ height: 12 }} />
        <Button
          title="Clear All Data (Catalog + Meals)"
          color="#e74c3c"
          onPress={() => askPinAndPerform('clearAll')}
        />
      </View>

      {/* PIN Modal */}
      <Modal
        visible={pinModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPinModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        >
          <View
            style={{
              width: '80%',
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Enter Admin PIN</Text>
            <TextInput
              value={pinInput}
              onChangeText={setPinInput}
              placeholder="Enter PIN"
              secureTextEntry
              keyboardType="numeric"
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                padding: 10,
                marginBottom: 16,
                fontSize: 18,
                textAlign: 'center',
                letterSpacing: 10,
              }}
            />
            <Button title="Confirm" onPress={onConfirmPin} />
            <View style={{ height: 8 }} />
            <Button
              title="Cancel"
              color="gray"
              onPress={() => {
                setPinModalVisible(false);
                setPinInput('');
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
