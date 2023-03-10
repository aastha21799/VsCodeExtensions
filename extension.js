// @ts-nocheck
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const { parentPort } = require('worker_threads');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "Unit Test Generator" is now active!');

	let disposable = vscode.commands.registerCommand('testytest.createBoilerplate', function () {

		vscode.window.showInformationMessage('Unit Test Generator is now active!');
		createInputFormWebView();
		console.log('Congratulations, you reached line 23 of code!');		
	});

	context.subscriptions.push(disposable);
}


function createInputFormWebView()
{
	const panel = vscode.window.createWebviewPanel(
		'This webview will be used for taking user input for the type of test cases', // Identifies the type of the webview. Used internally
		'Unit Test Generator', // Title of the panel displayed to the user
		vscode.ViewColumn.One, // Editor column to show the new webview panel in.
		{
			enableForms:true,
			enableScripts:true
		} // Webview options. More on these later.
	);

	const htmlFormContent = `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="Content-Security-Policy"  content="frame-src http://localhost:35637/" />
		<title>User Input</title>

		<style>
			* {
				box-sizing: border-box;
			}

			input[type=text], select, textarea {
				width: 100%;
				padding: 12px;
				border: 1px solid #ccc;
			  	border-radius: 4px;
			  	resize: vertical;
			}

			label {
				padding: 12px 12px 12px 0;
				display: inline-block;
			}

			input[type=submit] {
				background-color: #1b78cc;
				color: white;
				padding: 12px 20px;
				border: none;
				border-radius: 4px;
				cursor: pointer;
				float: right;
			}

			input[type=submit]:hover {
				background-color: #527ba1;
			}

			.container {
				border-radius: 5px;
				background-color: #f2f2f2;
				padding: 20px;
			}

			.col-25 {
				float: left;
				width: 25%;
				margin-top: 6px;
			}

			.col-75 {
				float: left;
				width: 75%;
  				margin-top: 6px;
			}

			/* Clear floats after the columns */
			.row:after {
				content: "";
				display: table;
				clear: both;
			}

			/* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
			@media screen and (max-width: 600px) {
				.col-25, .col-75, input[type=submit] {
					width: 100%;
					margin-top: 0;
  			}
		}
	</style>


	</head>

	<body>
	<div class = "container">
		
		<form enctype="multipart/form-data" action="http://localhost:35637" method="post" id="getUserInput">

			<label for="testFramework">Test Framework:</label><br>
			<input type="radio" id="testFramework" name="test_framework" value="MSTest">
			<label for="testFramework">MSTest</label><br>
			<input type="radio" id="testFramework" name="test_framework" value="XUnit">
			<label for="testFramework">XUnit</label><br>

			<label for="projectName">Project Name:</label><br>
			<input type="text" id="projectName" name="projectName"><br>
			
			<label for="namespace">Namespace:</label><br>
			<input type="text" id="namespace" name="namespace"><br>

			<label for="testClassName">Test Class Name:</label><br>
			<input type="text" id="testClassName" name="testClassName"><br>

			<label for="testMethodName">Test Method Name:</label><br>
			<input type="text" id="testMethodName" name="testMethodName"><br>
					
			<input type="hidden" name="MAX_FILE_SIZE" value="100000" /><br>
			Choose file to upload: <input name="uploadedfile" type="file" /><br>
			
			<input type="submit" value="Generate Unit Tests" />

		</form>

		<p id ="testJS">HelloParagraph</p>

	</div>

	<script>
		const pGrab = document.getElementById('testJS');
		pGrab.innerHTML = getString();

		function getString()
		{
			return "";
		}
	</script>

	</body>
	</html>`;

	panel.webview.html = htmlFormContent;
}



// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}