import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vim } from "@replit/codemirror-vim";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorState } from "@codemirror/state";

// Initialize state variables
let vimEnabled = false;
let editorExtensions = [basicSetup, javascript(), oneDark];

// Select the editor container
const editorContainer = document.getElementById("editor");

if (!editorContainer) {
	console.error("Editor container not found");
} else {
	// Create the initial editor view
	let view = new EditorView({
		state: EditorState.create({
			doc: 'document.getElementById("demo").innerHTML = "Paragraph changed.";',
			extensions: editorExtensions,
		}),
		parent: editorContainer,
	});

	// Select the vim toggle switch
	const vimToggleSwitch = document.getElementById("vimToggleSwitch");

	if (!vimToggleSwitch) {
		console.error("Vim toggle switch not found");
	} else {
		// Add an event listener to the switch
		vimToggleSwitch.addEventListener("change", () => {
			vimEnabled = vimToggleSwitch.checked;
			console.log("Vim mode is now", vimEnabled ? "enabled" : "disabled");
			updateEditorExtensions(view);
		});
	}

	// Function to update editor extensions
	function updateEditorExtensions(view) {
		try {
			// Reconfigure extensions based on vimEnabled flag
			if (vimEnabled) {
				editorExtensions = [vim(), basicSetup, javascript(), oneDark];
			} else {
				editorExtensions = [basicSetup, javascript(), oneDark];
			}

			// Create a new state with the updated extensions
			const newState = EditorState.create({
				doc: view.state.doc, // Preserve current document
				extensions: editorExtensions,
			});

			// Update the view's state
			view.setState(newState);

			console.log("Editor extensions updated", editorExtensions);
		} catch (error) {
			console.error("Error updating editor extensions:", error);
		}
	}
}
