import {db} from '../App';

export interface BlogPost {
  id?: number;
  title: string;
  content: string;
  created_at: string;
}

export const initDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, created_at TEXT)',
      [],
      () => {
        console.log('Table created successfully');
      },
      error => {
        console.log('Error creating table:', error);
        return false;
      },
    );
  });
};

export const addPost = (post: BlogPost): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO posts (title, content, created_at) VALUES (?, ?, ?)',
        [post.title, post.content, post.created_at],
        () => {
          resolve(true);
        },
        error => {
          console.log('Error inserting post:', error);
          reject(error);
          return false;
        },
      );
    });
  });
};

export const getPosts = (): Promise<BlogPost[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM posts ORDER BY created_at DESC',
        [],
        (_, results) => {
          const posts: BlogPost[] = [];
          for (let i = 0; i < results.rows.length; i++) {
            posts.push(results.rows.item(i));
          }
          resolve(posts);
        },
        error => {
          console.log('Error getting posts:', error);
          reject(error);
          return false;
        },
      );
    });
  });
};
