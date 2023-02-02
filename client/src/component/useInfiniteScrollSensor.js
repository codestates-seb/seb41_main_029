import { useRef, useCallback, useEffect } from "react";
import { Cookies } from "react-cookie";
import { newGallery } from "../api/galleryAPI";

export const useInfiniteScrollSensor = (setPost) => {
  const cookie = new Cookies();
  const token = cookie.get("token");
  let index = 0;

  const dom = useRef();

  const handleScroll = useCallback(([entry]) => {
    if (entry.isIntersecting) {
      index += 10;
      async function getNewGallery() {
        const res = await newGallery(token, index);
        setPost(res);
      }
      getNewGallery();
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
