import React, { useState } from "react";
import JSONEditor from "./JSONEditor";
import ArgumentEditor from "./ArgumentEditor";
import CustomLogicEditor from "./CustomLogicEditor";

interface CommandConfig {
  alias: string;
  baseCommand: string;
  permission: string;
  runAs: string;
  template: string;
  arguments: Argument[];
  customLogic: Record<string, LogicConfig>;
}

interface Argument {
  name: string;
  type: string;
  choices?: string[];
}

interface LogicConfig {
  type: string;
  params: Record<string, any>;
}

const CommandEditor: React.FC = () => {
  const [commandConfig, setCommandConfig] = useState<CommandConfig>({
    alias: "",
    baseCommand: "",
    permission: "",
    runAs: "console", // Default value
    template: "",
    arguments: [],
    customLogic: {},
  });

  // Add a new argument
  const addArgument = () => {
    setCommandConfig((prev) => ({
      ...prev,
      arguments: [...prev.arguments, { name: "", type: "string" }],
    }));
  };

  // Update an argument
  const updateArgument = (index: number, updatedArg: Argument) => {
    const updatedArguments = [...commandConfig.arguments];
    updatedArguments[index] = updatedArg;
    setCommandConfig((prev) => ({ ...prev, arguments: updatedArguments }));
  };

  // Remove an argument
  const removeArgument = (index: number) => {
    setCommandConfig((prev) => ({
      ...prev,
      arguments: prev.arguments.filter((_, i) => i !== index),
    }));
  };

  // Add custom logic
  const addCustomLogic = (key: string, logic: LogicConfig) => {
    setCommandConfig((prev) => ({
      ...prev,
      customLogic: { ...prev.customLogic, [key]: logic },
    }));
  };

  // Update existing custom logic
  const updateCustomLogic = (key: string, updatedLogic: LogicConfig) => {
    setCommandConfig((prev) => ({
      ...prev,
      customLogic: { ...prev.customLogic, [key]: updatedLogic },
    }));
  };

  // Remove custom logic
  const removeCustomLogic = (key: string) => {
    setCommandConfig((prev) => {
      const updatedCustomLogic = { ...prev.customLogic };
      delete updatedCustomLogic[key];
      return { ...prev, customLogic: updatedCustomLogic };
    });
  };

  // Load example configuration
  const loadExampleConfig = () => {
    setCommandConfig({
      alias: "giverandomdiamonds",
      runAs: "console",
      baseCommand: "give",
      permission: "flexiblecommands.command.giverandomdiamonds",
      template:
        "{baseCommand} {player} minecraft:diamond {custom:randomamount}",
      arguments: [
        {
          name: "player",
          type: "player",
        },
      ],
      customLogic: {
        randomamount: {
          type: "randomnumberrange",
          params: {
            min: 1,
            max: 64,
          },
        },
      },
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dynamic Command Editor</h1>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        onClick={loadExampleConfig}
      >
        Load Example Configuration
      </button>
      <div className="my-4">
        <label>Alias:</label>
        <input
          className="border p-2 w-full"
          type="text"
          value={commandConfig.alias}
          onChange={(e) =>
            setCommandConfig((prev) => ({ ...prev, alias: e.target.value }))
          }
        />
      </div>
      <div className="my-4">
        <label>Base Command:</label>
        <input
          className="border p-2 w-full"
          type="text"
          value={commandConfig.baseCommand}
          onChange={(e) =>
            setCommandConfig((prev) => ({
              ...prev,
              baseCommand: e.target.value,
            }))
          }
        />
      </div>
      <div className="my-4">
        <label>Permission:</label>
        <input
          className="border p-2 w-full"
          type="text"
          value={commandConfig.permission}
          onChange={(e) =>
            setCommandConfig((prev) => ({
              ...prev,
              permission: e.target.value,
            }))
          }
        />
      </div>
      <div className="my-4">
        <label>Run As:</label>
        <select
          className="border p-2 w-full"
          value={commandConfig.runAs}
          onChange={(e) =>
            setCommandConfig((prev) => ({ ...prev, runAs: e.target.value }))
          }
        >
          <option value="console">Console</option>
          <option value="player">Player</option>
        </select>
      </div>
      <div className="my-4">
        <label>Template:</label>
        <input
          className="border p-2 w-full"
          type="text"
          value={commandConfig.template}
          onChange={(e) =>
            setCommandConfig((prev) => ({
              ...prev,
              template: e.target.value,
            }))
          }
        />
      </div>
      <div className="my-4">
        <h2>Arguments</h2>
        {commandConfig.arguments.map((arg, index) => (
          <div key={index} className="mb-4 border p-4">
            <ArgumentEditor
              argument={arg}
              onChange={(updatedArg) => updateArgument(index, updatedArg)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-2"
              onClick={() => removeArgument(index)}
            >
              Remove Argument
            </button>
          </div>
        ))}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={addArgument}
        >
          Add Argument
        </button>
      </div>
      <div className="my-4">
        <h2>Custom Logic</h2>
        <CustomLogicEditor onAddCustomLogic={addCustomLogic} />
        {Object.entries(commandConfig.customLogic).map(([key, logic]) => (
          <div key={key} className="mb-4 border p-4">
            <h3 className="font-bold">Custom Logic: {key}</h3>
            <p>
              <strong>Type:</strong> {logic.type}
            </p>
            <pre className="bg-gray-100 p-2 rounded">
              {JSON.stringify(logic.params, null, 2)}
            </pre>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-2"
              onClick={() => removeCustomLogic(key)}
            >
              Remove Logic
            </button>
          </div>
        ))}
      </div>
      <div className="my-4">
        <h2>JSON Export/Import</h2>
        <JSONEditor json={commandConfig} setJson={setCommandConfig} />
      </div>
    </div>
  );
};

export default CommandEditor;
