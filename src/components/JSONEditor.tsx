import React from "react";
import { saveAs } from "file-saver";
import "prismjs/themes/prism-tomorrow.css"; // Import the dark theme for PrismJS
import Prism from "prismjs";

interface JSONEditorProps {
  json: any;
  setJson: (updatedJson: any) => void;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ json, setJson }) => {
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(json, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, "command-config.json");
  };

  const handleImport = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      setJson(JSON.parse(e.target.value));
    } catch (err) {
      alert("Invalid JSON format.");
    }
  };

  const highlightJson = (json: any) => {
    try {
      const jsonString = JSON.stringify(json, null, 2);
      return Prism.highlight(jsonString, Prism.languages.json, "json");
    } catch (err) {
      console.error("Failed to highlight JSON:", err);
      return JSON.stringify(json, null, 2);
    }
  };

  return (
    <div className="my-4">
      <h2 className="font-bold">JSON Editor</h2>
      <h3>Preview</h3>
      <div
        className="bg-gray-900 text-white font-mono p-4 rounded-md overflow-auto"
        style={{ maxHeight: "300px" }}
      >
        <pre
          className="language-json"
          dangerouslySetInnerHTML={{ __html: highlightJson(json) }}
        />
      </div>
      <br />
      <h3>Import/Export</h3>
      <textarea
        className="border p-2 w-full mt-2 font-mono bg-gray-100"
        rows={10}
        placeholder="Edit JSON here..."
        onChange={handleImport}
        defaultValue={JSON.stringify(json, null, 2)}
      />
      <div className="mt-2 flex gap-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleExport}
        >
          Download JSON
        </button>
      </div>
    </div>
  );
};

export default JSONEditor;
