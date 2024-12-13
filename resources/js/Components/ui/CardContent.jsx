
import React from "react";

export default function CardContent({ children, className = "" }) {
    return (
      <div className={`p-6 pt-0 ${className}`}>
        {children}
      </div>
    );
  }