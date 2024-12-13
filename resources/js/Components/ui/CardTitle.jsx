import React from "react";

export default function CardTitle({ children, className = "" }) {
    return (
      <h3 className={`text-2xl font-bold text-purpleTua ${className}`}>
        {children}
      </h3>
    );
  }