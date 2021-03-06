import React, { useEffect, useState, ReactElement, useRef } from 'react';
import logo from './logo.svg';
import loading from './assets/Ellipsis-1s-200px.svg';

import { getSomething, IPost, postsResponse } from './api';

// const LoadingComponent = () => {
//   return (
//     <div className="mt-6  flex justify-center">
//       {/* <span className="text-black text-2xl"> ...🤡😷🥳...</span> */}
//       <img src={loading} alt="" className="w-20" />
//     </div>
//   );
// };

const LoadingComponent = (): ReactElement => {
  return (
    <div className="mt-6  flex justify-center">
      {/* <span className="text-black text-2xl"> ...🤡😷🥳...</span> */}
      <img src={loading} alt="" className="w-20" />
    </div>
  );
};

function App() {
  const [postsAll, setPostsAll] = useState<IPost[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);

  const handleLoad = (start: number, end: number) => {
    const respose = postsAll.slice(start, end);
    setPosts([...posts, ...respose]);
    // console.log('posts', posts);
  };

  const handleSetData = async () => {
    const response = await getSomething();
    setPostsAll([...response]);
    setPosts([...response.slice(0, 10)]);
  };

  useEffect(() => {
    handleSetData();
  }, []);

  //***************************************************/
  const [element, setElement] = useState<HTMLDivElement | null>();

  return (
    <div className="App bg-gray-800 min-h-screen w-full text-center">
      <button onClick={(e) => handleLoad(11, 20)} className="mt-12 text-3xl">
        😎
      </button>
      <div className="mx-auto my-0 w-8/12 pt-12 pb-14 text-neon-eucalyptus">
        <div className="">
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
        </div>
        <div>
          <strong className="text-red-500 mt-12">NO Loading...</strong>
        </div>
      </div>
    </div>
  );
}

export default App;
