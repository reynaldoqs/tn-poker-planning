import React from "react";

export const Footer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...rest
}) => (
  <footer className={`flex items-center bg-bgDarker ${className}`} {...rest}>
    <section className="container mx-auto flex justify-between">
      <div className="text-sm text-txtDark">by ReynaldoQS</div>
      <div className="text-sm text-txtMedium">Linkedin</div>
    </section>
  </footer>
);
