import React, { useEffect } from 'react';
import { FlatList, RefreshControl, View, Linking, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, ActivityIndicator, useTheme } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../store/store';
import { loadStories } from '../store/slices/storiesSlice';

const NewsFeed = () => {
  const dispatch = useAppDispatch();
  const { items, loading, page } = useAppSelector(state => state.stories);
  const theme = useTheme();

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

  const handleCardPress = (url: string) => {
    if (url) {
      Linking.openURL(url).catch(err => 
        console.error('Failed to open URL:', err)
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card 
            style={styles.card}
            onPress={() => handleCardPress(item.url)}
          >
            <Card.Content>
              <Title style={styles.title}>{item.title}</Title>
              <Paragraph style={styles.author}>By {item.by}</Paragraph>
              {item.url && (
                <Paragraph style={styles.url} numberOfLines={1}>
                  {item.url.replace(/^https?:\/\//, '')}
                </Paragraph>
              )}
            </Card.Content>
          </Card>
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refresh}
            colors={[theme.colors.primary]}
          />
        }
        ListFooterComponent={
          loading ? <ActivityIndicator animating /> : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 8,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  url: {
    fontSize: 12,
    color: '#1a73e8',
    textDecorationLine: 'underline',
  },
});

export default NewsFeed;