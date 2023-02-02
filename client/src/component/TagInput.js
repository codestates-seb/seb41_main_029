import { useState } from "react";
import styled from "styled-components";
import "./styles.css";

conststyled.div``;

export default function TagInput() {
  const [tags, setTags] = useState(["please", "do not"]);
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
  return (
    <Container>
      <TagContainer>
        {tags.map((tag, index) => {
          return (
            <div key={index} className="tag">
              {tag} <span onClick={() => removeTag(tag)}>x</span>
            </div>
          );
        })}

        <input onKeyDown={addTag} />
      </TagContainer>
    </Container>
  );
}
