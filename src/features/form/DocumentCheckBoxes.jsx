import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Checkbox,
  Spinner,
  Grid,
} from "@chakra-ui/react";

import { useQuery } from "@tanstack/react-query";
import { getDocuments } from "../../services/apiGeneral";

function DocumentCheckBoxes({ setDocs, value }) {
  const { data, isLoading } = useQuery({
    queryKey: ["legal-docs"],
    queryFn: getDocuments,
    staleTime: Infinity,
  });

  function handleChange(e) {
    const docID = e.target.value;
    setDocs((prev) =>
      prev.includes(docID) ? prev.filter((i) => i !== docID) : [...prev, docID],
    );
  }

  return (
    <Accordion allowToggle w="100%" my={2}>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Chọn giấy tờ pháp lý
            </Box>
            {!isLoading ? <AccordionIcon /> : <Spinner size="sm" />}
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} px={0}>
          {!isLoading && data.length > 0 && (
            <Grid templateColumns="repeat(2, 1fr)">
              {data.map((doc) => (
                <Checkbox
                  key={doc.doc_id}
                  onChange={handleChange}
                  value={doc.doc_id}
                  isChecked={value?.includes(doc.doc_id)}
                >
                  {doc.doc_name}
                </Checkbox>
              ))}
            </Grid>
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default DocumentCheckBoxes;
