import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  ViewToken,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import VideoComponent from './VideoComponent';

const { height: HEIGHT, width: WIDTH } = Dimensions.get('window');
let mock = [{"id":"0","author":"Alejandro Escamilla","width":5000,"height":3333,"url":"https://unsplash.com/photos/yC-Yzbqy7PY","download_url":"https://picsum.photos/id/0/5000/3333"},{"id":"1","author":"Alejandro Escamilla","width":5000,"height":3333,"url":"https://unsplash.com/photos/LNRyGwIJr5c","download_url":"https://picsum.photos/id/1/5000/3333"},{"id":"2","author":"Alejandro Escamilla","width":5000,"height":3333,"url":"https://unsplash.com/photos/N7XodRrbzS0","download_url":"https://picsum.photos/id/2/5000/3333"},{"id":"3","author":"Alejandro Escamilla","width":5000,"height":3333,"url":"https://unsplash.com/photos/Dl6jeyfihLk","download_url":"https://picsum.photos/id/3/5000/3333"},{"id":"4","author":"Alejandro Escamilla","width":5000,"height":3333,"url":"https://unsplash.com/photos/y83Je1OC6Wc","download_url":"https://picsum.photos/id/4/5000/3333"}]
export default function VideoFeed() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  /* ---------- Viewability Config ---------- */
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 80,
  }).current;

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  /* ---------- Fetch Data ---------- */
  const fetchData = useCallback(async () => {
    // setLoading(true);
    // try {
    //   const res = await fetch(
    //     'https://picsum.photos/v2/list?page=1&limit=5'
    //   );
    //   const json = await res.json();
    //   setData(json);
    // } catch (e) {
    //   console.log(e);
    // } finally {
    //   setLoading(false);
    // }
    setLoading(false)
    setData(mock)
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /* ---------- Kill Feed on Blur ---------- */
  useFocusEffect(
    useCallback(() => {
      return () => {
        setCurrentIndex(0);
      };
    }, [])
  );

  /* ---------- Layout Optimization ---------- */
  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: HEIGHT,
      offset: HEIGHT * index,
      index,
    }),
    []
  );

  /* ---------- Render Item ---------- */
  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <VideoComponent
        // item={item}
        isVisible={currentIndex === index}
        // currentIndex={currentIndex}
      />
    ),
    [currentIndex]
  );

  /* ---------- Stable Keys ---------- */
  const keyExtractor = useCallback(
    (item: any) => item.id.toString(),
    []
  );

  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      pagingEnabled
      snapToInterval={HEIGHT}
      snapToAlignment="start"
      disableIntervalMomentum
      decelerationRate="fast"

      windowSize={2}
      initialNumToRender={1}
      maxToRenderPerBatch={2}
      removeClippedSubviews

      getItemLayout={getItemLayout}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged}

      showsVerticalScrollIndicator={false}

      ListFooterComponent={
        loading ? (
          <View style={styles.footer}>
            <ActivityIndicator />
          </View>
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  footer: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
