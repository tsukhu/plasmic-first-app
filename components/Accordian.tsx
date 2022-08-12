import React from 'react';
import { styled, keyframes } from '@stitches/react';
import { violet, blackA, mauve } from '@radix-ui/colors';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-accordion-content-height)' },
});

const slideUp = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: 0 },
});

const StyledAccordion = styled(AccordionPrimitive.Root, {
  borderRadius: 6,
  width: 300,
  backgroundColor: mauve.mauve6,
  boxShadow: `0 2px 10px ${blackA.blackA4}`,
});

const StyledItem = styled(AccordionPrimitive.Item, {
  overflow: 'hidden',
  marginTop: 1,

  '&:first-child': {
    marginTop: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },

  '&:last-child': {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },

  '&:focus-within': {
    position: 'relative',
    zIndex: 1,
    boxShadow: `0 0 0 2px ${mauve.mauve12}`,
  },
});

const StyledHeader = styled(AccordionPrimitive.Header, {
  all: 'unset',
  display: 'flex',
});

const StyledTrigger = styled(AccordionPrimitive.Trigger, {
  all: 'unset',
  fontFamily: 'inherit',
  backgroundColor: 'transparent',
  padding: '0 20px',
  height: 45,
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: 15,
  lineHeight: 1,
  color: violet.violet11,
  boxShadow: `0 1px 0 ${mauve.mauve6}`,
  '&[data-state="closed"]': { backgroundColor: 'white' },
  '&[data-state="open"]': { backgroundColor: 'white' },
  '&:hover': { backgroundColor: mauve.mauve2 },
});

const StyledContent = styled(AccordionPrimitive.Content, {
  overflow: 'hidden',
  fontSize: 15,
  color: mauve.mauve11,
  backgroundColor: mauve.mauve2,

  '&[data-state="open"]': {
    animation: `${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
});

const StyledContentText = styled('div', {
  padding: '15px 20px',
});

const StyledChevron = styled(ChevronDownIcon, {
  color: violet.violet10,
  transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',
  '[data-state=open] &': { transform: 'rotate(180deg)' },
});

// Exports
export const Accordion = StyledAccordion;
export const AccordionItem = StyledItem;
export const AccordionTrigger = React.forwardRef(
  (
    { children, ...props }: { children: string; props?: any },
    forwardedRef: any
  ) => (
    <StyledHeader>
      <StyledTrigger {...props} ref={forwardedRef}>
        {children}
        <StyledChevron aria-hidden />
      </StyledTrigger>
    </StyledHeader>
  )
);

AccordionTrigger.displayName = 'AccordionTrigger';
export const AccordionContent = React.forwardRef(
  (
    { children, ...props }: { children: string; props?: any },
    forwardedRef: any
  ) => (
    <StyledContent {...props} ref={forwardedRef}>
      <StyledContentText>{children}</StyledContentText>
    </StyledContent>
  )
);
AccordionContent.displayName = 'AccordionContent';

export const AccordionDemoItem = ({
  value,
  content,
  label,
}: {
  value: string;
  content: string;
  label: string;
}) => {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger>{label}</AccordionTrigger>
      <AccordionContent>{content}</AccordionContent>
    </AccordionItem>
  );
};
export interface AccordionDemoItemProps {
  value: string;
  label: string;
  content: string;
}
export const DEFAULT_ACCORDIAN_ITEMS: AccordionDemoItemProps[] = [
  {
    value: 'item-1',
    label: 'Is Plasmic for building websites? Apps?',
    content: `All of the above!

    The current most common use case for Plasmic is website content management and building pages, but a core goal of Plasmic is to be a flexible visual development platform.`,
  },
  {
    value: 'item-2',
    label: `How does Plasmic work with design tools?`,
    content: `Plasmic provides a Figma importer, but this usually only gets you to a starting point, since Figma’s data model tends to be far from what you will ultimately want to ship. `,
  },
  {
    value: 'item-3',
    label: `Is Plasmic limited to building static pages?`,
    content: `No. Plasmic can build pages and components that have dynamic data and behavior. Plasmic is used to design the visual parts, while code provides the dynamic data and behavior—either using code components or the overrides API.`,
  },
];
// Your app...
export const AccordionDemo = ({
  items = DEFAULT_ACCORDIAN_ITEMS,
  collapsible,
  type,
}: {
  items: AccordionDemoItemProps[];
  collapsible?: boolean;
  type: 'single' | 'multiple';
}) => (
  <Accordion type={type} collapsible={collapsible}>
    {items.map(({ label, content, value }) => (
      <AccordionDemoItem
        key={label}
        label={label}
        content={content}
        value={value}
      />
    ))}
  </Accordion>
);

export default AccordionDemo;
