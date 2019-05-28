// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated

	function getName(uri) {
		const parts = uri.toString().split('/');
		return parts[parts.length - 1];
	}

	context.subscriptions.push(vscode.commands.registerCommand('extension.copyFilenameNoExt', function (uri) {
		try {
			const name = getName(uri);
			const parts = name.split('.');
			const noExt = parts[0];
			
			vscode.env.clipboard.writeText(noExt);
			vscode.window.setStatusBarMessage(`Copied '${noExt}' to the clipboard.`);
		} catch (err) {
			vscode.window.showErrorMessage(err.message);
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('extension.copyFilename', function (uri) {
		try {
			const name = getName(uri);
			
			vscode.env.clipboard.writeText(name);
			vscode.window.setStatusBarMessage(`Copied '${name}' to the clipboard.`);
		} catch (err) {
			vscode.window.showErrorMessage(err.message);
		}
	}));
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
