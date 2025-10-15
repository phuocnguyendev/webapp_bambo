import React from "react";
import { Helmet } from "react-helmet-async";

interface AppHelmetProps {
  title?: string;
  description?: string;
}

const AppHelmet: React.FC<AppHelmetProps> = ({ title, description }) => (
  <Helmet>
    {title && <title>{title}</title>}
    {description && <meta name="description" content={description} />}
  </Helmet>
);

export default AppHelmet;
