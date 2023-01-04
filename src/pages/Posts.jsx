import { useState, useEffect } from 'react';
import 'assets/App.scss';
import { Container } from 'react-bootstrap';
import Post from 'components/elements/Card/Post';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((oliot) => setPosts(oliot));
  }, []);

  return (
    <>
      <Container fluid className="bg-drinks h-25 py-2">
        <div className="pt-5">
          <h1 className="display-3 text-white">
            Posts <span>&#128195;</span>
          </h1>
          <p className="fs-5 fw-semibold">
            Here are some cards made by fetching example data from{' '}
            <a
              className="link-primary"
              target={'_blank'}
              rel={'noreferrer'}
              href="https://jsonplaceholder.typicode.com/"
            >
              JSONPlaceholder
            </a>
          </p>
        </div>
      </Container>

      <div className="container my-5">
        <div className="row">
          {posts &&
            posts.map((post) => (
              <div className="col-lg-4 mb-5" key={post.id}>
                <div className="h-100">
                  <Post
                    postImg={
                      'https://images.unsplash.com/photo-1637614052127-80276701a4e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80'
                    }
                    postKey={post.id}
                    cardTitle={post.title}
                    cardText={post.body}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Posts;
