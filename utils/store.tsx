// store.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export type Meal = 'breakfast' | 'lunch' | 'snack' | 'dinner';

export interface Item {
  id: number;
  name: string;
  price: number;
}

export interface DailyMealsData {
  [date: string]: {
    [meal in Meal]?: Item[];
  };
}

interface StoreContextType {
  catalog: Item[];
  dailyMealsData: DailyMealsData;
  loadStore: () => Promise<void>;
  addCatalogItem: (item: Item) => Promise<void>;
  updateCatalogItem: (item: Item) => Promise<void>;
  deleteCatalogItem: (id: number) => Promise<void>;
  addMealItem: (date: string, meal: Meal, item: Item) => Promise<void>;
  clearAllMealsData: () => Promise<void>;
  clearAllData: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const CATALOG_KEY = 'catalog';
const MEALS_KEY = 'daily_meals';

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [catalog, setCatalog] = useState<Item[]>([]);
  const [dailyMealsData, setDailyMealsData] = useState<DailyMealsData>({});

  // Load catalog & meals on mount
  const loadStore = async () => {
    try {
      const catalogRaw = await AsyncStorage.getItem(CATALOG_KEY);
      const mealsRaw = await AsyncStorage.getItem(MEALS_KEY);

      setCatalog(catalogRaw ? JSON.parse(catalogRaw) : []);
      setDailyMealsData(mealsRaw ? JSON.parse(mealsRaw) : {});
    } catch (e) {
      console.error('Failed to load store:', e);
    }
  };

  useEffect(() => {
    loadStore();
  }, []);

  // Save helpers
  const saveCatalog = async (newCatalog: Item[]) => {
    try {
      await AsyncStorage.setItem(CATALOG_KEY, JSON.stringify(newCatalog));
      setCatalog(newCatalog);
    } catch (e) {
      console.error('Failed to save catalog:', e);
    }
  };

  const saveMeals = async (newMeals: DailyMealsData) => {
    try {
      await AsyncStorage.setItem(MEALS_KEY, JSON.stringify(newMeals));
      setDailyMealsData(newMeals);
    } catch (e) {
      console.error('Failed to save meals:', e);
    }
  };

  // Catalog mutations
  const addCatalogItem = async (item: Item) => {
    const newCatalog = [...catalog, item];
    await saveCatalog(newCatalog);
  };

  const updateCatalogItem = async (updatedItem: Item) => {
    const newCatalog = catalog.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    await saveCatalog(newCatalog);
  };

  const formatDateKey = (date: Date): string => {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${d}`;
 };


  const deleteCatalogItem = async (id: number) => {
  const newCatalog = catalog.filter((item: Item) => item.id !== id);
  await saveCatalog(newCatalog);

  // const todayStr = new Date().toISOString().split('T')[0];
  const todayStr = formatDateKey(new Date());

  const newMeals: DailyMealsData = {};

  for (const date in dailyMealsData) {
    const mealsForDate = dailyMealsData[date];

    // Preserve past and today's data as-is
    if (date <= todayStr) {
      newMeals[date] = mealsForDate;
      continue;
    }

    // For future dates only, remove the item
    const updatedMealsForDate: Partial<Record<Meal, Item[]>> = {};

    for (const mealKey in mealsForDate) {
      const meal = mealKey as Meal;

      updatedMealsForDate[meal] = mealsForDate[meal]?.filter(
        (item: Item) => item.id !== id
      );
    }

    newMeals[date] = updatedMealsForDate;
  }

  await saveMeals(newMeals);
};





  // Meal mutations
  const addMealItem = async (date: string, meal: Meal, item: Item) => {
    const mealsForDate = dailyMealsData[date] || {};
    const itemsForMeal = mealsForDate[meal] || [];
    const updatedItems = [...itemsForMeal, item];
    const updatedMealsForDate = { ...mealsForDate, [meal]: updatedItems };
    const newMeals = { ...dailyMealsData, [date]: updatedMealsForDate };
    await saveMeals(newMeals);
  };

  // Clear only meals data but keep catalog
  const clearAllMealsData = async () => {
    try {
      await AsyncStorage.removeItem(MEALS_KEY);
      setDailyMealsData({});
    } catch (e) {
      console.error('Failed to clear meals data:', e);
    }
  };

  // Clear all data (catalog + meals)
  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      setCatalog([]);
      setDailyMealsData({});
    } catch (e) {
      console.error('Failed to clear all data:', e);
    }
  };





  return (
    <StoreContext.Provider
      value={{
        catalog,
        dailyMealsData,
        loadStore,
        addCatalogItem,
        updateCatalogItem,
        deleteCatalogItem,
        addMealItem,
        clearAllMealsData,
        clearAllData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

// Hook to use store easily
export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
