import React from "react";
import CommandEditor from "../components/CommandEditor";
import { Link } from "gatsby";

const CommandEditorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-12">
      <div className="mb-4">
        <Link
          to="/"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Back to Home
        </Link>
      </div>
      <CommandEditor />
    </div>
  );
};

export default CommandEditorPage;
