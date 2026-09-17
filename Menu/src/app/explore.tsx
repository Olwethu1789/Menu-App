import { useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: string;
  price: string;
};

export default function MenuScreen() {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const saveMenuItem = () => {
    // Check dish name
    if (!dishName.trim()) {
      Alert.alert('Missing information', 'Please enter the dish name.');
      return;
    }

    // Check description
    if (!description.trim()) {
      Alert.alert('Missing information', 'Please enter a description.');
      return;
    }

    // Check course
    if (!course) {
      Alert.alert('Missing information', 'Please select a course.');
      return;
    }

    // Check price
    if (!price.trim() || isNaN(Number(price)) || Number(price) < 0) {
      Alert.alert('Invalid price', 'Please enter a valid price.');
      return;
    }

    // Create a new menu item
    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: dishName.trim(),
      description: description.trim(),
      course,
      price: Number(price).toFixed(2),
    };

    // Add the new item to the list
    setMenuItems((currentItems) => [...currentItems, newItem]);

    Alert.alert('Success', 'Menu item added successfully.');

    // Clear the form
    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');
  };

  const selectCourse = () => {
    Alert.alert(
      'Select a course',
      'Choose the course for this dish.',
      [
        {
          text: 'Starter',
          onPress: () => setCourse('Starter'),
        },
        {
          text: 'Main Course',
          onPress: () => setCourse('Main Course'),
        },
        {
          text: 'Dessert',
          onPress: () => setCourse('Dessert'),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuCard}>
      <Text style={styles.dishName}>{item.name}</Text>

      <Text style={styles.course}>{item.course}</Text>

      <Text style={styles.description}>{item.description}</Text>

      <Text style={styles.price}>R{item.price}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={renderMenuItem}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <View>
            {/* Application Title */}
            <Text style={styles.title}>Chef's Menu Manager</Text>

            <Text style={styles.subtitle}>
              Add and manage your restaurant menu
            </Text>

            {/* Menu Form */}
            <View style={styles.form}>
              {/* Dish Name */}
              <Text style={styles.label}>Dish Name</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter dish name"
                value={dishName}
                onChangeText={setDishName}
              />

              {/* Description */}
              <Text style={styles.label}>Description</Text>

              <TextInput
                style={[styles.input, styles.descriptionInput]}
                placeholder="Enter dish description"
                value={description}
                onChangeText={setDescription}
                multiline
              />

              {/* Course */}
              <Text style={styles.label}>Course</Text>

              <TouchableOpacity
                style={styles.courseButton}
                onPress={selectCourse}
              >
                <Text
                  style={
                    course
                      ? styles.courseButtonText
                      : styles.coursePlaceholder
                  }
                >
                  {course || 'Select a course'}
                </Text>

                <Text style={styles.arrow}>▼</Text>
              </TouchableOpacity>

              {/* Price */}
              <Text style={styles.label}>Price</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter price"
                value={price}
                onChangeText={setPrice}
                keyboardType="decimal-pad"
              />

              {/* Add Menu Item Button */}
              <TouchableOpacity
                style={styles.button}
                onPress={saveMenuItem}
              >
                <Text style={styles.buttonText}>ADD MENU ITEM</Text>
              </TouchableOpacity>
            </View>

            {/* Menu Items Heading */}
            <Text style={styles.menuTitle}>Menu Items</Text>

            {/* Message when no items exist */}
            {menuItems.length === 0 && (
              <Text style={styles.emptyMessage}>
                No menu items have been added yet.
              </Text>
            )}
          </View>
        }
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  listContainer: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
    marginTop: 20,
  },

  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666666',
    marginTop: 8,
    marginBottom: 25,
  },

  form: {
    backgroundColor: '#f5f5f5',
    padding: 18,
    borderRadius: 12,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 7,
    marginTop: 10,
  },

  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },

  descriptionInput: {
    height: 90,
    textAlignVertical: 'top',
  },

  /* Course selector */
  courseButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 15,
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  courseButtonText: {
    fontSize: 16,
    color: '#000000',
  },

  coursePlaceholder: {
    fontSize: 16,
    color: '#777777',
  },

  arrow: {
    fontSize: 14,
    color: '#555555',
  },

  /* Add button */
  button: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 25,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  /* Menu list */
  menuTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 30,
    marginBottom: 15,
  },

  emptyMessage: {
    fontSize: 15,
    color: '#777777',
    textAlign: 'center',
    marginBottom: 20,
  },

  menuCard: {
    backgroundColor: '#f5f5f5',
    padding: 18,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#dddddd',
  },

  dishName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },

  course: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555555',
    marginTop: 4,
  },

  description: {
    fontSize: 15,
    color: '#333333',
    marginTop: 10,
    lineHeight: 21,
  },

  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 12,
  },
});