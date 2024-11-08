// A dummy page that simply shows the name of the current route and a button to go to another route

import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';

import {HeaderFooterLayout} from '../../components/layouts/header_footer_layout';
import {Button} from '../../components/button';
import {Input} from '../../components/input';
import {ContentWrapper, PostTitle, PostContent, PostCard, PostDate, AddPostWrapper, ButtonWrapper} from './styles';
import {BlogPost, addPost, getPosts, initDatabase} from '../../services/database';

export const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [newPost, setNewPost] = useState({title: '', content: ''});
  const [isAddingPost, setIsAddingPost] = useState(false);

  useEffect(() => {
    initDatabase();
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const loadedPosts = await getPosts();
      setPosts(loadedPosts);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  const handleAddPost = async () => {
    if (!newPost.title || !newPost.content) return;

    try {
      await addPost({
        title: newPost.title,
        content: newPost.content,
        created_at: new Date().toISOString(),
      });
      setNewPost({title: '', content: ''});
      setIsAddingPost(false);
      loadPosts();
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const renderPost = ({item}: {item: BlogPost}) => (
    <PostCard>
      <PostTitle>{item.title}</PostTitle>
      <PostContent>{item.content}</PostContent>
      <PostDate>{new Date(item.created_at).toLocaleDateString()}</PostDate>
    </PostCard>
  );

  return (
    <HeaderFooterLayout>
      <ContentWrapper>
        <ButtonWrapper>
          <Button onPress={() => setIsAddingPost(!isAddingPost)}>{isAddingPost ? 'Cancel' : 'Add New Post'}</Button>
        </ButtonWrapper>

        {isAddingPost && (
          <AddPostWrapper>
            <Input
              placeholder="Title"
              value={newPost.title}
              onChangeText={text => setNewPost({...newPost, title: text})}
            />
            <Input
              placeholder="Content"
              value={newPost.content}
              onChangeText={text => setNewPost({...newPost, content: text})}
              multiline
              numberOfLines={4}
            />
            <ButtonWrapper>
              <Button onPress={handleAddPost}>Save Post</Button>
            </ButtonWrapper>
          </AddPostWrapper>
        )}

        <FlatList data={posts} renderItem={renderPost} keyExtractor={item => item.id?.toString() || ''} />
      </ContentWrapper>
    </HeaderFooterLayout>
  );
};
