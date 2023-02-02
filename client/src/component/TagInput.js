import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  margin: 10px 0;
`;
const TagContainer = styled.div`
  width: 260px;
  /* min-width: 60%; */
  /* max-width: 75%; */
  display: flex;
  flex-wrap: wrap;
  min-height: 30px;
  border: 3px solid #62b6b7;
  border-radius: 10px;
  padding: 5.5px 8px;

  > input {
    border: none;
    /* flex: 0.3; */
    width: 120px;
    outline: none;
    padding: 5px;
    background: #fff;
    color: #000;
  }
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  padding: 2px 8px;
  /* border: 1px solid gray; */
  border-radius: 8px;
  height: 25px;
  margin: 2px 5px 2px 0px;
  color: #fff;
  background-color: #62b6b7;
  font-size: 14px;

  > span {
    margin-left: 5px;
    font-size: 12px;
    cursor: pointer;
  }
`;

export default function TagInput() {
  const [tags, setTags] = useState(["태그"]);
  const addTag = (e) => {
    if (e.key === "Enter") {
      if (e.target.value.length > 0) {
        setTags([...tags, e.target.value]);
        e.target.value = "";
      }
    }
  };
  const removeTag = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };
  console.log(tags);
  return (
    <Container>
      <TagContainer>
        {tags.map((tag, index) => {
          return (
            <Tag key={index}>
              {tag} <span onClick={() => removeTag(tag)}>x</span>
            </Tag>
          );
        })}

        <input placeholder="태그를 작성해주세요." onKeyDown={addTag} />
      </TagContainer>
    </Container>
  );
}
