import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  return (
    <div className="container mx-auto my-5">
      <p className="text-center">
        In production, we should not show this to the user! But here&apos;s the
        stack trace:
      </p>
      <div className="mockup-code">
        {error.stack.split("\n").map((line, index) => (
          <pre
            key={index}
            data-prefix={index + 1}
            className={`${index === 0 && "bg-warning text-warning-content"}`}
          >
            <code>{line}</code>
          </pre>
        ))}
      </div>
    </div>
  );
};

export default Error;
