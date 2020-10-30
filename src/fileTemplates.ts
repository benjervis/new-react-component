export const createFileTemplate = (componentName: string) =>
  `import React from 'react';

interface ${componentName}Props {
  
}

export const ${componentName} = ({ }: ${componentName}Props) => {
  return (
    
  );
};
`;
