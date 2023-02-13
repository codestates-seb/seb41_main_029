import { useRef, useCallback, useEffect } from "react";
import { Cookies } from "react-cookie";
import { likedGallery, newGallery } from "../api/galleryAPI";

export const useInfiniteScrollSensor = (setPost, sortby) => {
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
      } else {
        async function getNewGallery1() {
          const res = await likedGallery(token, index);
          setPost(res);
        }
        getNewGallery1();
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
