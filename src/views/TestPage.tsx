import React from "react";
import { reqRoutes } from "../utils/reqRoutes";

const TestPage: React.FC = () => {
  return (
    <div>
      <button
        onClick={async () => {
          const req = await fetch(`${reqRoutes()}/api/test`, {
            credentials: "include",
          });
          const res = await req.json();
          console.log(res);
        }}
      >
        Test
      </button>
    </div>
  );
};

export default TestPage;
