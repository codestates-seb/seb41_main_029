import { useRef, useCallback, useEffect } from "react";
import { Cookies } from "react-cookie";
import { likedGallery, newGallery } from "../api/galleryAPI";

export const useInfiniteScrollSensor = (setPost, sortby) => {
  console.log(sortby);
  const cookie = new Cookies();
  const token = cookie.get("token");
  let index = 0;

  const dom = useRef();

  const handleScroll = useCallback(([entry]) => {
    if (entry.isIntersecting) {
      index += 10;
      if (sortby === "최신순") {
        async function getNewGallery() {
          const res = await newGallery(token, index);
          setPost(res);
        }
        getNewGallery();
      } else if (sortby === "좋아요순") {
        async function getLikedGallery() {
          const res = await likedGallery(token, index);
          setPost(res);
        }
        getLikedGallery();
      }
    }
  }, []);

  useEffect(() => {
    let observer;
    const { current } = dom;

    if (current) {
      observer = new IntersectionObserver(handleScroll, { threshold: 0.1 });
      observer.observe(current);
      return () => observer && observer.disconnect();
    }
  }, [handleScroll]);

  return {
    ref: dom,
  };
};
