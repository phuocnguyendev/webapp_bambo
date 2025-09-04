// create page content of dashboard | location | components ....-active

import { FC, PropsWithChildren } from 'react';

const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  return <div className="m-h-page-layout">{children}</div>;
};

export default PageLayout;
