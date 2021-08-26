import React, {
  useEffect,
  useState,
  ReactElement,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import logo from './logo.svg';
import loading from './assets/Ellipsis-1s-200px.svg';
import './App.css';
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

// function App() {
//   const [postsAll, setPostsAll] = useState<IPost[]>([]);
//   const [posts, setPosts] = useState<IPost[]>([]);

//   const handleLoad = (start: number, end: number) => {
//     const respose = postsAll.slice(start, end);
//     setPosts([...posts, ...respose]);
//     // console.log('posts', posts);
//   };

//   const handleSetData = async () => {
//     const response = await getSomething();
//     setPostsAll([...response]);
//     setPosts([...response.slice(0, 10)]);
//   };

//   useEffect(() => {
//     handleSetData();
//   }, []);

//   //***************************************************/
//   const [element, setElement] = useState<HTMLDivElement | null>();

//   const observable = new IntersectionObserver(
//     (IntersectionItem) => {
//       // console.log('IntersectionItem 😎', IntersectionItem);

//       if (IntersectionItem[0].isIntersecting) {
//         console.log('🤩 :', IntersectionItem[0].isIntersecting);
//         setTimeout(() => {
//           handleLoad(
//             posts.length,
//             postsAll.length > posts.length ? posts.length + 10 : postsAll.length
//           );
//         }, 1000);
//       } else {
//         console.log('🥵 :', IntersectionItem[0].isIntersecting);
//       }
//     },
//     { threshold: 1 }
//   );

//   useEffect(() => {
//     if (element) {
//       // console.log('observable 😷', observable);
//       observable.observe(element);
//     }

//     return () => {
//       if (element) {
//         observable.unobserve(element);
//       }
//     };
//   }, [element, observable]);

//   return (
//     <div className="App bg-gray-800 min-h-screen">
//       <button onClick={(e) => handleLoad(11, 20)}>😎</button>
//       <div className="mx-auto my-0 w-8/12 pt-12 pb-14 text-neon-eucalyptus">
//         <div>
//           {posts &&
//             posts.map((item, index) => {
//               return (
//                 <div
//                   key={item.id}
//                   className="py-5  mt-4 px-2 bg-gray-900 rounded-lg text-xl flex justify-between"
//                 >
//                   <strong className="text-4xl">{index + 1}:</strong>
//                   <img src={item.data} alt="" loading="lazy" />
//                   {item.message}
//                 </div>
//               );
//             })}
// {postsAll.length > posts.length && (
//   <div ref={setElement}>
//     <LoadingComponent />
//   </div>
// )}
//         </div>
//       </div>
//     </div>
//   );
// }

function App() {
  const [postsAll, setPostsAll] = useState<IPost[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);

  const handleLoad = useCallback(
    (start: number, end: number) => {
      const respose = postsAll.slice(start, end);
      setPosts([...posts, ...respose]);
      // console.log('posts', posts);
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
  const [element, setElement] = useState<HTMLDivElement | null>();

  const observable = useMemo(
    () =>
      new IntersectionObserver(
        (IntersectionItem) => {
          if (IntersectionItem[0].isIntersecting) {
            console.log('🤩 :', IntersectionItem[0].isIntersecting);
            setTimeout(() => {
              handleLoad(
                posts.length,
                postsAll.length > posts.length
                  ? posts.length + 10
                  : postsAll.length
              );
            }, 1000);
          } else {
            console.log('🥵 :', IntersectionItem[0].isIntersecting);
          }
        },
        { threshold: 1 }
      ),
    [handleLoad]
  );

  useEffect(() => {
    if (element) {
      // console.log('observable 😷', observable);
      observable.observe(element);
    }
    return () => {
      if (element) {
        observable.unobserve(element);
      }
    };
  }, [element, observable]);

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
                  <img src={item.data} alt="" loading="lazy" />
                  {item.message}
                </div>
              );
            })}
          {postsAll.length > posts.length && (
            <div ref={setElement}>
              <LoadingComponent />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
