import React from "react";

interface Argument {
  name: string;
  type: string;
  choices?: string[];
}

interface ArgumentEditorProps {
  argument: Argument;
  onChange: (updatedArgument: Argument) => void;
}

const ArgumentEditor: React.FC<ArgumentEditorProps> = ({
  argument,
  onChange,
}) => {
  const handleTypeChange = (type: string) => {
    const updatedArgument = { ...argument, type };
    if (type === "choice") {
      updatedArgument.choices = []; // Initialize choices for "choice" type
    } else {
      delete updatedArgument.choices; // Remove choices if not a "choice" type
    }
    onChange(updatedArgument);
  };

  return (
    <div className="border p-4 my-2">
      <div className="my-2">
        <label>Argument Name:</label>
        <input
          className="border p-2 w-full"
          type="text"
          value={argument.name}
          onChange={(e) => onChange({ ...argument, name: e.target.value })}
        />
      </div>
      <div className="my-2">
        <label>Argument Type:</label>
        <select
          className="border p-2 w-full"
          value={argument.type}
          onChange={(e) => handleTypeChange(e.target.value)}
        >
          <option value="string">String</option>
          <option value="int">Integer</option>
          <option value="choice">Choice</option>
          <option value="player">Player</option>
        </select>
      </div>
      {argument.type === "choice" && (
        <div className="my-2">
          <label>Choices:</label>
          <textarea
            className="border p-2 w-full"
            rows={3}
            value={argument.choices?.join(",") || ""}
            onChange={(e) =>
              onChange({
                ...argument,
                choices: e.target.value
                  .split(",")
                  .map((choice) => choice.trim()),
              })
            }
          />
          <small className="text-gray-600">
            Enter choices separated by commas.
          </small>
        </div>
      )}
    </div>
  );
};

export default ArgumentEditor;
