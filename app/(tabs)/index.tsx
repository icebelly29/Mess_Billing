import Calendar from '@/components/Calendar';
import { DailyMealsData, Item, Meal, useStore } from '@/utils/store';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  Button,
  Keyboard,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const MEALS: Meal[] = ['breakfast', 'lunch', 'snack', 'dinner'];

export default function HomeScreen() {
  const {
    catalog,
    dailyMealsData,
    addMealItem,
  } = useStore();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>('breakfast');
  const [selectedCatalogItemId, setSelectedCatalogItemId] = useState<number | null>(null);

  const [billModalVisible, setBillModalVisible] = useState(false);
  const [billModalData, setBillModalData] = useState<{ date: string; meals: DailyMealsData[string] | null }>({
    date: '',
    meals: null,
  });


  const formatDateKey = (date: Date) => {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${d}`;
  };

const todayKey = formatDateKey(new Date());
const dateKey = formatDateKey(currentDate);


  // Get meal items for selected date & meal from global store
  const mealItems = selectedMeal ? dailyMealsData[dateKey]?.[selectedMeal] ?? [] : [];


  // Calculate total bill for current month so far
  const totalBillForMonth = useMemo(() => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    let total = 0;
    for (const dateStr in dailyMealsData) {
      const date = new Date(dateStr);
      if (date >= monthStart && date <= monthEnd) {
        const meals = dailyMealsData[dateStr];
        for (const meal of MEALS) {
          const items = meals?.[meal] ?? [];
          total += items.reduce((sum, item) => sum + item.price, 0);
        }
      }
    }
    return total;
  }, [dailyMealsData]);

  // Add selected catalog item to meal using store action
  const addSelectedCatalogItemToMeal = async () => {
    if (!selectedMeal) return;
    if (selectedCatalogItemId === null) {
      Alert.alert('Select item', 'Please select an item from the catalog.');
      return;
    }

    const itemToAdd = catalog.find((item) => item.id === selectedCatalogItemId);
    if (!itemToAdd) {
      Alert.alert('Invalid item', 'Selected item not found in catalog.');
      return;
    }

    try {
      await addMealItem(dateKey, selectedMeal, itemToAdd);
      setSelectedCatalogItemId(null); // reset selection
    } catch (e) {
      console.error('Failed to add meal item:', e);
      Alert.alert('Error', 'Failed to add item. Please try again.');
    }
  };

  // // Calendar onShowBill handler for past dates
  // const handleShowBill = (date: Date) => {
  //   const dateKey = date.toISOString().split('T')[0];
  //   const meals = dailyMealsData[dateKey] || null;
  //   if (!meals) {
  //     Alert.alert('No data', `No meal data for ${dateKey}`);
  //     return;
  //   }
  //   setBillModalData({ date: dateKey, meals });
  //   setBillModalVisible(true);
  // };

  const handleShowBill = (date: Date) => {
  const dateKey = formatDateKey(date);  // Use local date string formatter here
  const meals = dailyMealsData[dateKey] || null;
  if (!meals) {
    Alert.alert('No data', `No meal data for ${dateKey}`);
    return;
  }
  setBillModalData({ date: dateKey, meals });
  setBillModalVisible(true);
};


  // Helper: get total price for a meal's items
  const getMealTotal = (items: Item[]) => items.reduce((sum, i) => sum + i.price, 0);

  // Catalog picker only shows if catalog has items
  const CatalogPicker = () => {
    if (catalog.length === 0) return null;

    return (
      <View style={{ marginVertical: 12 }}>
        <Text style={{ color: 'white', marginBottom: 6 }}>Select item from catalog:</Text>
        <ScrollView style={{ maxHeight: 120, backgroundColor: '#1e1e1e', borderRadius: 4 }}>
          {catalog.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => setSelectedCatalogItemId(item.id)}
              style={{
                padding: 10,
                backgroundColor: selectedCatalogItemId === item.id ? '#2e7d32' : 'transparent',
              }}
            >
              <Text style={{ color: 'white' }}>
                {item.name} - ₹{item.price.toFixed(2)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Button title="Add Selected Item" onPress={addSelectedCatalogItemToMeal} color="#2e7d32" />
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container}>
        {/* Total bill for current month */}
        <View style={styles.totalBillContainer}>
          <Text style={styles.totalBillText}>
            Total Bill This Month: ₹{totalBillForMonth.toFixed(2)}
          </Text>
        </View>

        {/* Calendar */}
        <Calendar currentDate={currentDate} setCurrentDate={setCurrentDate} onShowBill={handleShowBill} />

        {/* Meal tabs only for today */}
        {dateKey === todayKey && (
          <View style={styles.mealTabs}>
            {MEALS.map((meal) => (
              <TouchableOpacity
                key={meal}
                style={[styles.mealTab, selectedMeal === meal && styles.mealTabSelected]}
                onPress={() => setSelectedMeal(meal)}
              >
                <Text style={[styles.mealTabText, selectedMeal === meal && styles.mealTabTextSelected]}>
                  {meal.charAt(0).toUpperCase() + meal.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Meal detail + Catalog Picker only if selectedMeal and today */}
        {selectedMeal && dateKey === todayKey && (
          <View style={styles.mealDetail}>
            <Text style={styles.mealTitle}>
              Add Items for {selectedMeal.charAt(0).toUpperCase() + selectedMeal.slice(1)}
            </Text>

            <CatalogPicker />

            {/* Show added items for this meal */}
            {mealItems.length > 0 && (
              <View style={{ marginTop: 12 }}>
                <Text style={{ color: 'white', fontWeight: '600', marginBottom: 6 }}>Current Items:</Text>
                {mealItems.map((item: Item, index: number) => (
                  <Text key={`${item.id}-${index}`} style={{ color: 'white', marginVertical: 2 }}>
                    {item.name} - ₹{item.price.toFixed(2)}
                  </Text>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Bill modal */}
        <Modal
          visible={billModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setBillModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Bill for {billModalData.date}</Text>
              {billModalData.meals ? (
                MEALS.map((meal) => {
                  const items = billModalData.meals?.[meal] ?? [];
                  if (items.length === 0) return null;
                  return (
                    <View key={meal} style={{ marginBottom: 12 }}>
                      <Text style={styles.modalMealTitle}>
                        {meal.charAt(0).toUpperCase() + meal.slice(1)} (₹
                        {getMealTotal(items).toFixed(2)})
                      </Text>
                      {items.map((item) => (
                        <Text key={item.id} style={styles.modalItemText}>
                          {item.name} - ₹{item.price.toFixed(2)}
                        </Text>
                      ))}
                    </View>
                  );
                })
              ) : (
                <Text style={{ color: '#ccc' }}>No meals found.</Text>
              )}
              <Button
                title="Close"
                onPress={() => setBillModalVisible(false)}
                color="#2e7d32"
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    padding: 16,
    flex: 1,
  },
  totalBillContainer: {
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2e7d32',
    marginBottom: 12,
  },
  totalBillText: {
    color: '#2e7d32',
    fontSize: 20,
    fontWeight: 'bold',
  },
  mealTabs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  mealTab: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#222',
    marginHorizontal: 4,
    borderRadius: 6,
  },
  mealTabSelected: {
    backgroundColor: '#2e7d32',
  },
  mealTabText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  mealTabTextSelected: {
    color: 'white',
  },
  mealDetail: {
    backgroundColor: '#222',
    padding: 12,
    borderRadius: 8,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: 'white',
  },
  modalMealTitle: {
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 4,
  },
  modalItemText: {
    color: 'white',
    marginLeft: 12,
  },
});
