import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";

export default [
  
  js.configs.recommended,
  prettier,

 
  {
    languageOptions: {
      globals: {
        ...globals.node,      
        ...globals.browser,  
        ...globals.jest,      
      },
    },
    rules: {
      semi: "error",
      quotes: ["error", "double"],
    },
  },
];

