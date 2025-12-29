  const adultCategories:{
    id: string;
    title: string;
    subtitle: string;
    image: string;
}[] = [
  {
    id: '1',
    title: 'Romantic',
    subtitle: 'Soft, emotional & intimate vibes',
    image: 'https://picsum.photos/seed/romantic/400/600',
  },
  {
    id: '2',
    title: 'Seductive',
    subtitle: 'Confident & teasing energy',
    image: 'https://picsum.photos/seed/seductive/400/600',
  },
  {
    id: '3',
    title: 'Late Night',
    subtitle: 'Moody, dark & private',
    image: 'https://picsum.photos/seed/latenight/400/600',
  },
  {
    id: '4',
    title: 'Fantasy',
    subtitle: 'Imagination without limits',
    image: 'https://picsum.photos/seed/fantasy/400/600',
  },
  {
    id: '5',
    title: 'Couples',
    subtitle: 'Shared moments & connection',
    image: 'https://picsum.photos/seed/couples/400/600',
  },
  {
    id: '6',
    title: 'Solo Mood',
    subtitle: 'Personal, expressive & free',
    image: 'https://picsum.photos/seed/solo/400/600',
  },
  {
    id: '7',
    title: 'Roleplay',
    subtitle: 'Characters & scenarios',
    image: 'https://picsum.photos/seed/roleplay/400/600',
  },
  {
    id: '8',
    title: 'Luxury',
    subtitle: 'Premium & high-end energy',
    image: 'https://picsum.photos/seed/luxury/400/600',
  },
];
 import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
} from 'react-native';
import TopBar from '../components/TopBar';
import CategoryCard from '../components/CategoryCard';
import CategorySkeleton from '../components/CategorySkeleton';
import { COLORS } from '../assets/variables/vars';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const Category = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    // simulate API loading
    setTimeout(() => {
      setData(adultCategories);
      setLoading(false);
    }, 900);
  }, []);

  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TopBar title="Category" />

      {/* Search */}
      <TextInput
        placeholder="Search moods..."
        placeholderTextColor="#888"
        style={styles.search}
        value={query}
        onChangeText={setQuery}
      />

      {/* Grid */}
      <FlatList
        data={loading ? Array.from({ length: 8 }) : filteredData}
        numColumns={2}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.list}
        renderItem={({ item, index }) =>
          loading ? (
            <CategorySkeleton />
          ) : (
            <CategoryCard
              item={item}
              index={index}
              onPress={(category) =>
                navigation.navigate('CategoryDetail', { category })
              }
            />
          )
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
    flex: 1,

  },
  list: {
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  search: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: COLORS.color_selective,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: '#fff',
  },
});

export default Category;
