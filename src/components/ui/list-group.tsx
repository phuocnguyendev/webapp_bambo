import styled from 'styled-components';

export const ListGroup = styled.ul.attrs({
  className: 'grid grid-cols-1 divide-y bg-list-group',
})``;

export const ListGroupItem = styled.li.attrs({
  className:
    'py-3 px-5 text-list-group-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer',
})``;
