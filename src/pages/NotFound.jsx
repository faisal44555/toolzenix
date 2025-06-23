import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Toolzenix</title>
        <meta name="description" content="The page you are looking for could not be found on Toolzenix.com." />
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 gradient-text">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <Button>Go back to homepage</Button>
        </Link>
      </div>
    </>
  );
};

export default NotFound;