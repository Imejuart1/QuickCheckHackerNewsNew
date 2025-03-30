// src/screens/NewsFeed.tsx
import React, { useEffect } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { Card, Title, Paragraph, ActivityIndicator } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../store';
import { loadStories } from '../store/slices/storiesSlice';

const NewsFeed = () => {
  const dispatch = useAppDispatch();
  const { items, loading, page } = useAppSelector(state => state.stories);

  useEffect(() => {
    dispatch(loadStories(0));
  }, []);

  const loadMore = () => {
    if (!loading) {
      dispatch(loadStories(page));
    }
  };

  const refresh = () => {
    dispatch(loadStories(0));
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={{ margin: 8 }}>
            <Card.Content>
              <Title>{item.title}</Title>
              <Paragraph>By {item.by}</Paragraph>
              {item.url && <Paragraph>{item.url}</Paragraph>}
            </Card.Content>
          </Card>
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refresh}
          />
        }
        ListFooterComponent={
          loading ? <ActivityIndicator animating /> : null
        }
      />
    </View>
  );
};

export default NewsFeed;