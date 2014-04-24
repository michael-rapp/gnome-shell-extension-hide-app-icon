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

let iconBox;
let previousIconBoxWidth;
let previousIconBoxHeight;

/**
 * The method, which is invoked, when the extension has been enabled.
 */
function enable() {
    if (typeof Main.panel.statusArea.appMenu._iconBox != 'undefined') {
        iconBox = Main.panel.statusArea.appMenu._iconBox;
        previousIconBoxWidth = iconBox.get_width();
        previousIconBoxHeight = iconBox.get_height();        
        iconBox.set_width(0);
        iconBox.set_height(0);
        iconBox.hide();
    }
}

/**
 * The method, which is invoked, when the extension has been disabled.
 */
function disable() {
    if (iconBox) {
	    iconBox.set_width(previousIconBoxWidth);
        iconBox.set_height(previousIconBoxHeight);
        iconBox.show();
    }
}