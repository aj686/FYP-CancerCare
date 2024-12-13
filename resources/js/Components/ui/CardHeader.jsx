import React from "react";

export default function CardHeader({ children, className = "" }) {
    return (
      <div className={`p-6 ${className}`}>
        {children}
      </div>
    );
  }