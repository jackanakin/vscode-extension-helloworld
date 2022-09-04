// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import CatCodiconsPanel from "./CatCodiconsPanel";

import ColorsViewProvider from "./providers/ColorViewProvider";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "myhint" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("jk@hint.hint", () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    vscode.window.showInformationMessage("Hello VS! jk@hint.hint");
  });

  let time = vscode.commands.registerCommand("jk@hint.time", () => {
    const datetime = new Date();
    vscode.window.showWarningMessage(datetime.getTime().toLocaleString());
  });

  context.subscriptions.push(disposable);
  context.subscriptions.push(time);

  // CALICO COLORS VIEW
  const provider = new ColorsViewProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      ColorsViewProvider.viewType,
      provider
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("calicoColors.addColor", () => {
      provider.addColor();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("calicoColors.clearColors", () => {
      provider.clearColors();
    })
  );
  ////////////////////////////////////

  // Using codicons in webviews
  context.subscriptions.push(
    vscode.commands.registerCommand("catCodicons.show", () => {
      CatCodiconsPanel.show(context.extensionUri);
    })
  );
  ////////////////////////////////////
}

// this method is called when your extension is deactivated
export function deactivate() {}
