
import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TextInput } from 'react-native';
import TopBar from '../components/TopBar';
import CategoryCard from '../components/CategoryCard';
import CategorySkeleton from '../components/CategorySkeleton';
import { COLORS } from '../assets/variables/vars';
import { DrawerNavigationProp, DrawerScreenProps } from '@react-navigation/drawer';



type CharacterType = {
  title:string;
  description:string;
}

const Category = () => {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [data, setData] = useState<CharacterType[]>([]);

  
  const fetchCharacters = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('http://192.168.29.97:3000/api/characters');
      const json = await res.json();
      setData(json.body ?? []); 
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <View style={styles.container}>
      <TopBar title="AI Bots" />

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
        data={loading ? Array.from({ length: 8 }).map((x)=>{
          return {title:"",description:""}
        }) : filteredData}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        // columnWrapperStyle={styles.list}
        contentContainerStyle={{padding:10,}}
        renderItem={({ item, index }:{item:CharacterType,index:number}) =>
          loading ? (
            <CategorySkeleton />
          ) : (
            <CategoryCard
              item={item}
              index={index}
              onPress={(category:CharacterType)=>{
                console.log(category)
              } }
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
