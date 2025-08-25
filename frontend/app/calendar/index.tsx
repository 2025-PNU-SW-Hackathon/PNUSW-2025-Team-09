import { useState } from 'react';
import { View, StatusBar, StyleSheet, Dimensions } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dec.',
  ],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
  today: 'Today',
};

LocaleConfig.defaultLocale = 'en';

export default function CalendarScreen() {
  const [selected, setSelected] = useState<string>('');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Calendar
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        style={styles.calendar}
        markedDates={
          selected
            ? {
                [selected]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: 'orange',
                },
              }
            : {}
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendar: {
    borderColor: 'gray',
    width: screenWidth * 0.9,
    height: screenHeight * 0.7,
  },
});
