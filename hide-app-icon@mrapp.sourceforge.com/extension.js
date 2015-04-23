/**
 * ================================================
 *  Gnome Shell Extension - Hide App Icon - README
 * ================================================
 * 
 * The GNOME Shell Extension "Hide App Icon" allows to hide the icon of the
 * currently focused application in the top panel of the GNOME shell.
 * 
 * This extension is available on Sourceforge via the following URL:
 * 
 * https://sourceforge.net/p/hide-app-icon
 * 
 * ==============
 *  Installation
 * ==============
 * 
 * For using this extension it is necessary to copy the folder
 * "hide-app-icon@mrapp.sourceforge.com", which is contained by the package,
 * the extension has been shiped with, to the path
 * "~/.local/share/gnome-shell/extensions". For installing the extension this
 * way, the shell script INSTALL.sh can be used. This script automatically
 * copies all relevant files to the appropriate folder and replaces an already
 * installed version of the extension, if existing. When using the bash script,
 * the installation of this extension is possible by running the following
 * commands in a terminal (the name of the zip-file maybe has to be adjusted 
 * to the actual version of the release):
 *  
 * $ unzip gnome-shell-extension-title-to-panel-v.1.0.zip 
 * $ cd gnome-shell-extension-title-to-panel
 * $./INSTALL.sh
 * 
 * To enable the extension an application such like "Gnome Tweak Tool" may be 
 * used.
 * 
 * ========
 *  Author 
 * ========
 * 
 * Michael Rapp (E-Mail: michael.rapp90@googlemail.com)
 * 
 * This software has been published as open source according to the terms and
 * conditions of the GNU General Public License Version 2.
 */
const Main = imports.ui.main;
const ExtensionUtils = imports.misc.extensionUtils;
const Extension = ExtensionUtils.getCurrentExtension();
const Convenience = Extension.imports.convenience;
const Preferences = Extension.imports.prefs;

/**
 * The method, which is invoked, when the extension has been enabled.
 */
function enable() {
	let settings = Convenience.getSettings();
	let boolHideIcon = settings.get_boolean(Preferences.HIDE_ICON);
	let boolHideLabel = settings.get_boolean(Preferences.HIDE_LABEL);
	let boolHideArrow = settings.get_boolean(Preferences.HIDE_ARROW);
	
	hideIcon(boolHideIcon);
	hideLabel(boolHideLabel);
	hideArrow(boolHideArrow);
}

/**
 * The method, which is invoked, when the extension has been disabled.
 */
function disable() {
	hideIcon(false);
	hideLabel(false);
	hideArrow(false);
}

/**
 * Hides or shows the icon of the currently focused app in the top panel
 * of the GNOME shell.
 * 
 * @param hide True, if the icon should be hidden, false otherwise
 */
function hideIcon(hide) {
    if (typeof Main.panel.statusArea.appMenu._iconBox != 'undefined') {
        let iconBox = Main.panel.statusArea.appMenu._iconBox; 
        hideElement(iconBox, hide);
    }	
}

/**
 * Hides or shows the label of the currently focused app in the top panel
 * of the GNOME shell.
 * 
 * @param hide True, if the label should be hidden, false otherwise
 */
function hideLabel(hide) {
    if (typeof Main.panel.statusArea.appMenu._label != 'undefined') {
        let label = Main.panel.statusArea.appMenu._label; 
        hideElement(label, hide);
    }	
}

/**
 * Hides or shows the arrow, which corresponds to the menu of the currently 
 * focused app in the top panel of the GNOME shell.
 * 
 * @param hide True, if the arrow should be hidden, false otherwise
 */
function hideArrow(hide) {
    if (typeof Main.panel.statusArea.appMenu._arrow != 'undefined') {
        let arrow = Main.panel.statusArea.appMenu._arrow; 
        hideElement(arrow, hide);
    }	
}

/**
 * Hides or shows a specific UI element.
 * 
 * @param element 
 * 			The UI element, which should be hidden or shown
 * @param hide 
 * 			True, if the UI element should be hidden, false otherwise
 */
function hideElement(element, hide) {
	if (hide) {
		element.set_width(0);
		element.set_height(0);
		element.hide();
	} else {
		element.set_width(-1);
		element.set_height(-1);
		element.show();
	}
}