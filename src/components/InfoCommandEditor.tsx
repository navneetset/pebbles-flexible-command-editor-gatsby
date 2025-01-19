import React, { useState } from "react";
import JSONEditor from "./JSONEditor";

interface InfoCommandConfig {
  aliases: string[];
  permission: string;
  message: string;
}

const InfoCommandEditor: React.FC = () => {
  const [infoCommandConfig, setInfoCommandConfig] = useState<InfoCommandConfig>(
    {
      aliases: ["discord", "discordlink", "dc", "disc"],
      permission: "flexiblecommands.command.discord",
      message:
        "<green>Join our [<yellow><click:open_url:'https://discord.gg/yourserver'>Discord</click></yellow>] server!",
    }
  );

  const addAlias = () => {
    setInfoCommandConfig((prev) => ({
      ...prev,
      aliases: [...prev.aliases, ""],
    }));
  };

  const updateAlias = (index: number, value: string) => {
    const updatedAliases = [...infoCommandConfig.aliases];
    updatedAliases[index] = value;
    setInfoCommandConfig((prev) => ({ ...prev, aliases: updatedAliases }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Info Command Editor</h1>
      <div className="my-4">
        <label>Aliases:</label>
        {infoCommandConfig.aliases.map((alias, index) => (
          <div key={index} className="my-2 flex items-center gap-2">
            <input
              className="border p-2 w-full"
              type="text"
              value={alias}
              onChange={(e) => updateAlias(index, e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() =>
                setInfoCommandConfig((prev) => ({
                  ...prev,
                  aliases: prev.aliases.filter((_, i) => i !== index),
                }))
              }
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={addAlias}
        >
          Add Alias
        </button>
      </div>
      <div className="my-4">
        <label>Permission:</label>
        <input
          className="border p-2 w-full"
          type="text"
          value={infoCommandConfig.permission}
          onChange={(e) =>
            setInfoCommandConfig((prev) => ({
              ...prev,
              permission: e.target.value,
            }))
          }
        />
      </div>
      <div className="my-4">
        <label>Message:</label>
        <textarea
          className="border p-2 w-full"
          rows={4}
          value={infoCommandConfig.message}
          onChange={(e) =>
            setInfoCommandConfig((prev) => ({
              ...prev,
              message: e.target.value,
            }))
          }
        />
      </div>
      <JSONEditor
        json={infoCommandConfig}
        setJson={(updated: InfoCommandConfig) =>
          setInfoCommandConfig(updated as InfoCommandConfig)
        }
      />
    </div>
  );
};

export default InfoCommandEditor;
