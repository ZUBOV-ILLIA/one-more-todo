export default function Accordeon({ children, title } : { children: React.ReactNode, title: string }) {
    return (
        <div>
          <p className="text-indigo-700">
            {title}{' '}
            <span>^</span>
          </p>
          {children}
        </div>
    );
}