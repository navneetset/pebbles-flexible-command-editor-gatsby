import React, { useState } from "react";

interface LogicConfig {
  type: string;
  params: Record<string, any>;
}

interface CustomLogicEditorProps {
  onAddCustomLogic: (key: string, logic: LogicConfig) => void;
}

const CustomLogicEditor: React.FC<CustomLogicEditorProps> = ({
  onAddCustomLogic,
}) => {
  const [logicKey, setLogicKey] = useState("");
  const [logicType, setLogicType] = useState("randomnumberrange");
  const [params, setParams] = useState<Record<string, any>>({});

  const handleAddLogic = () => {
    if (!logicKey) {
      alert("Please provide a unique key for the custom logic.");
      return;
    }
    onAddCustomLogic(logicKey, { type: logicType, params });
    setLogicKey("");
    setLogicType("randomnumberrange");
    setParams({});
  };

  return (
    <div className="border p-4 my-2">
      <h3 className="font-bold">Add Custom Logic</h3>
      <div className="my-2">
        <label>Logic Key:</label>
        <input
          className="border p-2 w-full"
          type="text"
          value={logicKey}
          onChange={(e) => setLogicKey(e.target.value)}
        />
        <small className="text-gray-600">
          Key used to reference this logic in the template.
        </small>
      </div>
      <div className="my-2">
        <label>Logic Type:</label>
        <select
          className="border p-2 w-full"
          value={logicType}
          onChange={(e) => {
            setLogicType(e.target.value);
            setParams({});
          }}
        >
          <option value="randomnumberrange">Random Number Range</option>
          <option value="guaranteedmaxivs">Guaranteed Max IVs</option>
          <option value="randomplayer">Random Player</option>
          <option value="randomstringlist">Random String List</option>
        </select>
      </div>
      {logicType === "randomnumberrange" && (
        <div className="my-2">
          <label>Range (min, max):</label>
          <input
            className="border p-2 w-full"
            placeholder="e.g., 1,64"
            value={`${params.min || ""},${params.max || ""}`}
            onChange={(e) => {
              const [min, max] = e.target.value
                .split(",")
                .map((v) => parseInt(v.trim(), 10));
              setParams({ min, max });
            }}
          />
        </div>
      )}
      {logicType === "guaranteedmaxivs" && (
        <div className="my-2">
          <label>Number of Max IVs:</label>
          <input
            className="border p-2 w-full"
            type="number"
            value={params.numMaxIvs || ""}
            onChange={(e) =>
              setParams((prev) => ({
                ...prev,
                numMaxIvs: parseInt(e.target.value, 10),
              }))
            }
          />
          <label>Max Value:</label>
          <input
            className="border p-2 w-full"
            type="number"
            value={params.maxValue || ""}
            onChange={(e) =>
              setParams((prev) => ({
                ...prev,
                maxValue: parseInt(e.target.value, 10),
              }))
            }
          />
          <label>Random Range:</label>
          <input
            className="border p-2 w-full"
            placeholder="e.g., 0,31"
            value={`${params.randomRange?.[0] || ""},${
              params.randomRange?.[1] || ""
            }`}
            onChange={(e) => {
              const [min, max] = e.target.value
                .split(",")
                .map((v) => parseInt(v.trim(), 10));
              setParams((prev) => ({ ...prev, randomRange: [min, max] }));
            }}
          />
        </div>
      )}
      {logicType === "randomstringlist" && (
        <div className="my-2">
          <label>String List (comma-separated):</label>
          <textarea
            className="border p-2 w-full"
            rows={3}
            value={params.list?.join(",") || ""}
            onChange={(e) =>
              setParams({
                list: e.target.value.split(",").map((s) => s.trim()),
              })
            }
          />
        </div>
      )}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleAddLogic}
      >
        Add Custom Logic
      </button>
    </div>
  );
};

export default CustomLogicEditor;
