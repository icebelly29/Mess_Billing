// import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

type CalendarProps = {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  onShowBill?: (date: Date) => void;
};



export default function Calendar({ currentDate, setCurrentDate, onShowBill }: CalendarProps) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const today = new Date();
  const isToday = (year: number, month: number, day: number) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const isPastDate = (year: number, month: number, day: number) => {
    const clickedDate = new Date(year, month, day);
    // Only strict past date (before today)
    return (
      clickedDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())
    );
  };

  const isFutureDate = (year: number, month: number, day: number) => {
  const clickedDate = new Date(year, month, day);
  return clickedDate > new Date(today.getFullYear(), today.getMonth(), today.getDate());
};

  const handleDayPress = (day: number) => {
  const clickedDate = new Date(year, month, day);
  setCurrentDate(clickedDate);

  if (isPastDate(year, month, day)) {
    if (onShowBill) onShowBill(clickedDate);
    else Alert.alert('Bill', `Show bill for ${year}-${month + 1}-${day}`);
  }
};


  const goToPrevMonth = () => {
    const newDate = new Date(year, month - 1, 1);
    setCurrentDate(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(year, month + 1, 1);
    setCurrentDate(newDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goToPrevMonth}>
          <Text style={styles.nav}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {currentDate.toLocaleString('default', { month: 'long' })} {year}
        </Text>
        <TouchableOpacity onPress={goToNextMonth}>
          <Text style={styles.nav}>{'>'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.weekDays}>
        {WEEK_DAYS.map((d) => (
          <Text key={d} style={styles.weekDay}>
            {d}
          </Text>
        ))}
      </View>
      <View style={styles.grid}>
        {[...Array(startDay).fill(null), ...days].map((day, i) => (
          // <TouchableOpacity
          //   key={i}
          //   style={[styles.dayCell, day && isToday(year, month, day) ? styles.selected : null]}
          //   onPress={() => day && handleDayPress(day)}
          //   disabled={!day}
          // >
          //   <Text style={styles.dayText}>{day || ''}</Text>
          // </TouchableOpacity>
          <TouchableOpacity
  key={i}
  style={[
    styles.dayCell,
    day && isToday(year, month, day) ? styles.selected : null,
    day && isFutureDate(year, month, day) ? styles.disabledDay : null,
  ]}
  onPress={() => day && !isFutureDate(year, month, day) && handleDayPress(day)}
  disabled={!day || isFutureDate(year, month, day)}
>
  <Text style={styles.dayText}>{day || ''}</Text>
</TouchableOpacity>

        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerText: {
    fontSize: 18,
    color: 'white',
  },
  nav: {
    fontSize: 20,
    color: '#2e7d32',
    fontWeight: 'bold',
  },
  weekDays: {
    flexDirection: 'row',
    // Changed from space-around to space-between to better align
    justifyContent: 'space-between',
    marginBottom: 6,
    paddingHorizontal: 2, // Add some horizontal padding to align with grid
  },
  weekDay: {
    color: '#ccc',
    fontWeight: '600',
    width: 40, // slightly wider for text
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: 40, // same width as weekDay for alignment
    height: 40,
    marginVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  selected: {
    backgroundColor: '#2e7d32',
  },
  dayText: {
    color: 'white',
    fontWeight: '600',
  },
  disabledDay: {
    opacity: 0.3,
  },
});
