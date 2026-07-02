import type { ReactNode } from "react";

export function formatJobDescription(text: string) {
  const lines = text.split("\n");

  const elements: ReactNode[] = [];
  let listItems: ReactNode[] = [];

  const flushList = () => {
    if (listItems.length) {
      elements.push(
        <ul
          key={`list-${elements.length}`}
          className="list-disc pl-6 mb-5 space-y-2"
        >
          {listItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>,
      );

      listItems = [];
    }
  };

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();

    if (!line) {
      flushList();
      return;
    }

    // Liste
    if (line.startsWith("•")) {
      listItems.push(line.replace(/^•\s*/, ""));
      return;
    }

    flushList();

    // Titres entièrement en majuscules
    if (/^[A-Z\s&()/-]{4,}$/.test(line)) {
      elements.push(
        <h2 key={index} className="text-xl font-bold mt-8 mb-3 text-gray-900">
          {line}
        </h2>,
      );
      return;
    }

    // Champs du type "Department: ..."
    if (line.includes(":")) {
      const [title, ...rest] = line.split(":");

      elements.push(
        <p key={index} className="mb-2">
          <strong>{title}:</strong> {rest.join(":").trim()}
        </p>,
      );

      return;
    }

    // Paragraphe normal
    elements.push(
      <p key={index} className="mb-4 leading-7 text-gray-700">
        {line}
      </p>,
    );
  });

  flushList();

  return elements;
}
