import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../Buttons";
import { H1 } from "../Headings";
import { TextField } from "../Inputs";
import { Paragraph } from "../Paragraphs";

export const SearchPageMobile = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  `;
  return (
    <Container>
      <H1>Search Pins</H1>
      <TextField
        placeholder="Enter search term here"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        // onKeyUp={(e) => {
        //   if (e.key === "Enter") {
        //     navigate("/home/search");
        //   }
        // }}
      />
      <Button variants="primary">Search</Button>
      <Paragraph>Searching page is coming soon.</Paragraph>
    </Container>
  );
};
