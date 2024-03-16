import {
  Accordion,
  AccordionIcon,
  AccordionItem,
  AccordionButton,
  UnorderedList,
  ListItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { navLinks } from "../constants/navlink";

function NewsAccordionLinks() {
  return (
    <Accordion
      display={{ md: "flex" }}
      w="full"
      maxW="800px"
      mx="auto"
      justifyContent="center"
      allowMultiple
    >
      <AccordionItem w="full" borderBottomWidth={1}>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Nhà đất bán
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <UnorderedList>
            {navLinks[0].child_links.map((link, i) => (
              <ListItem key={i}>
                <Link
                  className="transition-colors duration-300 hover:text-primary dark:hover:text-secondary"
                  to={`/nha-dat-cho-thue/${link.type}`}
                >
                  {link.title}
                </Link>
              </ListItem>
            ))}
          </UnorderedList>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem w="full">
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Nhà đất cho thuê
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <UnorderedList>
            {navLinks[1].child_links.map((link, i) => (
              <ListItem key={i}>
                <Link
                  className="transition-colors duration-300
                  hover:text-primary dark:hover:text-secondary"
                  to={`/nha-dat-cho-thue/${link.type}`}
                >
                  {link.title}
                </Link>
              </ListItem>
            ))}
          </UnorderedList>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default NewsAccordionLinks;
