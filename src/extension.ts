// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';

import { createFileTemplate } from './fileTemplates';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "new-react-component" is now active!',
  );

  const validateComponentName = (inputName: string) => {
    if (inputName.includes(' ')) {
      return 'Component name cannot have spaces';
    }

    if (/\.tsx?$/.test(inputName)) {
      return 'You don’t need to include the extension';
    }

    return null;
  };

  const showPrompt = () =>
    vscode.window.showInputBox({
      prompt: 'Component name',
      validateInput: validateComponentName,
    });

  let disposable = vscode.commands.registerCommand(
    'new-react-component.new-comp',
    async ({ path }) => {
      const componentName = await showPrompt();
      if (!componentName) {
        return;
      }

      const dirName = `${path}/${componentName}`;
      const fileName = `${dirName}/${componentName}.tsx`;

      const fileContent = createFileTemplate(componentName);

      fs.mkdirSync(dirName);
      fs.writeFileSync(fileName, fileContent);

      // Display a message box to the user
      const document = await vscode.workspace.openTextDocument(fileName);
      await vscode.window.showTextDocument(document);
    },
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
