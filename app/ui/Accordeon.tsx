import { useState } from "react";

export default function Accordeon({
  children,
  title,
  className
}: {
  children: React.ReactNode,
  title: string,
  className?: string
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={className}>
      <p
        className="flex items-center text-indigo-700 mb-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}{' '}
        <span className={`${isOpen ? 'rotate-90' : 'rotate-180'} h-4 w-4 inline-block`}>^</span>
      </p>
      {isOpen && <>{children}</>}
    </div>
  );
}