import React, {
  useEffect,
  useState,
  ReactElement,
  useRef,
  useCallback,
} from 'react';
import logo from './logo.svg';
import loading from './assets/Ellipsis-1s-200px.svg';
import './App.css';
import { getSomething, IPost, postsResponse } from './api';
import { useInView } from 'react-intersection-observer';

const LoadingComponent = (): ReactElement => {
  return (
    <div className="mt-6  flex justify-center">
      <img src={loading} alt="" className="w-20" />
    </div>
  );
};

function App() {
  const [postsAll, setPostsAll] = useState<IPost[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);

  // 💢 Bad !!
  // const handleLoad = (start: number, end: number) => {
  //   setTimeout(() => {
  //     const respose = postsAll.slice(start, end);
  //     setPosts([...posts, ...respose]);
  //   }, 1000);
  // };

  // 🌟 Good !!
  const handleLoad = useCallback(
    (start: number, end: number) => {
      setTimeout(() => {
        const respose = postsAll.slice(start, end);
        setPosts([...posts, ...respose]);
      }, 1000);
    },
    [posts]
  );

  const handleSetData = async () => {
    const response = await getSomething();
    setPostsAll([...response]);
    setPosts([...response.slice(0, 10)]);
  };

  useEffect(() => {
    handleSetData();
  }, []);

  //***************************************************/
  // const [element, setElement] = useState<HTMLDivElement | null>();
  const { ref: element, inView } = useInView({ threshold: 1 });

  useEffect(() => {
    if (inView) {
      console.log('🤩', inView);

      handleLoad(
        posts.length,
        postsAll.length > posts.length ? posts.length + 10 : postsAll.length
      );
    } else {
      console.log('🥵', inView);
    }
  }, [inView]);

  return (
    <div className="App bg-gray-800 min-h-screen">
      <button onClick={(e) => handleLoad(11, 20)}>😎</button>
      <div className="mx-auto my-0 w-8/12 pt-12 pb-14 text-neon-eucalyptus">
        <div>
          {posts &&
            posts.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className="py-5  mt-4 px-2 bg-gray-900 rounded-lg text-xl flex justify-between"
                >
                  <strong className="text-4xl">{index + 1}:</strong>
                  <img src={item.data} alt="" />
                  {item.message}
                </div>
              );
            })}
          <div ref={element}>
            <LoadingComponent />
          </div>
          {/* <p ref={setElement}>Loaging</p> */}
        </div>
      </div>
    </div>
  );
}

export default App;
