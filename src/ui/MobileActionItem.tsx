import { NavLink } from "react-router-dom";
import { IoChevronForward } from "react-icons/io5";
import DynamicFaIcon from "./DynamicFaIcon";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

interface Props {
  to: string;
  title: string;
  icon: string;
  onClose: () => void;
  child?: {
    title: string;
    type: string;
    child?: { title: string; type: string }[];
  }[];
}

function MobileActionItem({ to, title, onClose, icon, child }: Props) {
  const RootLink = () => (
    <NavLink
      to={!child ? to : `/danh-muc/${to}`}
      onClick={onClose}
      className={({ isActive }) =>
        isActive
          ? "flex w-fit items-center gap-4 py-3 pl-4 text-primary dark:text-secondary"
          : "flex w-fit items-center gap-4 py-3 pl-4 transition-colors duration-200 hover:text-primary dark:hover:text-secondary"
      }
    >
      <span className="text-xl">
        <DynamicFaIcon name={icon} />
      </span>
      <span className="text-lg">{title}</span>
    </NavLink>
  );

  return !child ? (
    <RootLink />
  ) : (
    <Accordion allowMultiple>
      <AccordionItem className="!border-none">
        <h2>
          <AccordionButton pl={0} py={0}>
            <Box as="span" flex="1" textAlign="left">
              <RootLink />
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} display="flex" flexDir="column" fontSize="md">
          {child.map((child, index) => {
            return child.child ? (
              <Accordion allowMultiple key={child.type}>
                <AccordionItem className="!border-none" my={1}>
                  <h2>
                    <AccordionButton my={1}>
                      <Box as="span" flex="1" textAlign="left">
                        <NavLink
                          onClick={onClose}
                          to={`/danh-muc/${to}/${child.type}`}
                          className={({ isActive }) =>
                            isActive ? "!text-primary dark:text-secondary" : ""
                          }
                        >
                          {child.title}
                        </NavLink>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>

                  <AccordionPanel
                    py={2}
                    display="flex"
                    flexDir="column"
                    gap={1}
                    fontSize="md"
                  >
                    {child.child.map((link) => (
                      <NavLink
                        onClick={onClose}
                        className={({ isActive }) =>
                          `${
                            isActive && "text-primary dark:text-secondary"
                          } flex items-center gap-1 pl-3.5`
                        }
                        key={link.type}
                        to={`/danh-muc/${to}/${child.type}/${link.type}`}
                      >
                        <IoChevronForward />
                        {link.title}
                      </NavLink>
                    ))}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            ) : (
              <NavLink
                onClick={onClose}
                to={`${to}/${child.type}`}
                key={index}
                className={({ isActive }) =>
                  isActive ? "pb-1 !text-primary dark:text-secondary" : " pb-1"
                }
              >
                {child.title}
              </NavLink>
            );
          })}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default MobileActionItem;
