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

function DocumentCheckBoxes({
  setDocs,
  value,
  deleteDocsRef,
  addDocsRef,
  edit,
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["legal-docs"],
    queryFn: getDocuments,
    staleTime: Infinity,
  });

  // value - old full array [{..},{..}]
  // format -> [9, 11]
  const formatValue = value?.map((i) => i.docName.doc_id);

  function handleChange(e) {
    const docID = Number(e.target.value);
    const associatedDocument = value.find(
      (doc) => doc.docName.doc_id === docID,
    );

    if (edit) {
      if (associatedDocument) {
        // This item was originally checked, and now it has been unchecked
        const alreadyAddedToDelete = deleteDocsRef.current.some(
          (doc) => doc.id === associatedDocument.id,
        );

        if (!alreadyAddedToDelete) {
          deleteDocsRef.current.push(associatedDocument);
        } else {
          deleteDocsRef.current = deleteDocsRef.current.filter(
            (doc) => doc.id !== associatedDocument.id,
          );
        }
      } else {
        // This new item was checked
        const alreadyAddedToAdd = addDocsRef.current.includes(docID);

        if (!alreadyAddedToAdd) {
          addDocsRef.current.push(docID);
        } else {
          addDocsRef.current = addDocsRef.current.filter((id) => id !== docID);
        }
      }
    }

    return setDocs((prev) =>
      prev.includes(docID) ? prev.filter((i) => i !== docID) : [...prev, docID],
    );
  }

  return (
    <Accordion allowToggle w="100%" my={2}>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Chọn giấy tờ pháp lý <span className="text-red-500">*</span>
            </Box>
            {!isLoading ? (
              <AccordionIcon />
            ) : (
              <Spinner size="sm" thickness="2px" speed="0.3s" />
            )}
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} px={0}>
          {!isLoading && data.length > 0 && (
            <Grid
              gap={{ base: 1.5, sm: 0 }}
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            >
              {data.map((doc) => (
                <Checkbox
                  key={doc.doc_id}
                  onChange={(e) => handleChange(e)}
                  value={doc.doc_id}
                  defaultChecked={formatValue?.includes(doc.doc_id)}
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
