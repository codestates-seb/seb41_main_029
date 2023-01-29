// 애니메이션 트리거 이벤트를 DOM에 지정하기 위한 Custom Hook
import { useRef, useCallback, useEffect } from "react";

export const useScrollFadeIn = () => {
  const dom = useRef();

  const handleScroll = useCallback(([entry]) => {
    const { current } = dom;

    // isIntersecting: 브라우저 뷰포트와 설정한 요소의 교차점을 관찰해서 사용자 화면에 지금 요소가 보이고 있는지를 판별
    if (entry.isIntersecting) {
      // 애니메이션 목록
      current.style.transitionDuration = "3s";
      current.style.opacity = 1;
    }
  }, []);

  useEffect(() => {
    let observer;
    const { current } = dom;

    if (current) {
      observer = new IntersectionObserver(handleScroll, { threshold: 0.1 }); // 동작하게할 함수와 observer 세팅 값을 넘겨주어야 함
      // threshold에는 숫자나 숫자들이 담긴 배열을 줄 수 있으며 얼마나 노출됬을때 실행할지를 결정함
      observer.observe(current); // observe(): 관찰할 대상을 등록

      return () => observer && observer.disconnect(); // disconnect(): IntersectionObserver 인스턴스가 관찰하는 모든 요소의 관찰을 중지
      // 특정 요소 하나의 관찰만을 중지하고 싶을때는 unobserve(대상 요소) 를 사용
    }
  }, [handleScroll]);

  return {
    ref: dom,
    style: {
      opacity: 0,
    },
  };
};

// 이외의 Intersection Observer에 관한 내용은 https://heropy.blog/2019/10/27/intersection-observer/ 참고!
