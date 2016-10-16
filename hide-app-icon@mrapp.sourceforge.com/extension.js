const Main = imports.ui.main;
const ExtensionUtils = imports.misc.extensionUtils;
const Extension = ExtensionUtils.getCurrentExtension();
const Convenience = Extension.imports.convenience;
const Preferences = Extension.imports.prefs;
const Lang = imports.lang;

/**
 * The method, which is invoked, when the extension has been enabled.
 */
function enable() {
    let settings = Convenience.getSettings();
    registerSettingChanges(settings);
    onEnabled(settings);
}

/**
 * The method, which is invoked, when the extension has been disabled.
 */
function disable() {
    let settings = Convenience.getSettings();
    unregisterSettingChanges(settings);
    onDisabled();
}

/**
 * Registers to be notified when the extension's settings have been changed
 * in order to be able to show/hide UI elements accordingly.
 *
 * @param settings The extension's settings
 */
function registerSettingChanges(settings) {
    settings.connect('changed::hide-app-icon', Lang.bind(this, function() {
        onEnabled(settings);
    }));

    settings.connect('changed::hide-app-label', Lang.bind(this, function() {
        onEnabled(settings);
    }));

    settings.connect('changed::hide-arrow', Lang.bind(this, function() {
        onEnabled(settings);
    })); 
}

/**
 * Stops hiding/showing of UI elements when the settings of the extension
 * have been changed.
 */
function unregisterSettingChanges(settings) {
    settings.connect('changed::hide-app-icon', Lang.bind(this, function() {
        onDisabled();
    }));

    settings.connect('changed::hide-app-label', Lang.bind(this, function() {
        onDisabled();
    }));

    settings.connect('changed::hide-arrow', Lang.bind(this, function() {
        onDisabled();
    }));
}

/**
 * Shows or hides UI elements according to the extension's settings.
 * 
 * @param settings The extension's settings
 */
function onEnabled(settings) {
    hideIcon(settings.get_boolean(Preferences.HIDE_ICON));
    hideLabel(settings.get_boolean(Preferences.HIDE_LABEL));
    hideArrow(settings.get_boolean(Preferences.HIDE_ARROW));
}

/**
 * Shows all UI elements.
 */
function onDisabled() {
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

    // Special handling for shell version 3.12 and 3.14
    if (label.toString().contains('TextShadower')) {
            label = label._label;
        }

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
 *          The UI element, which should be hidden or shown
 * @param hide 
 *          True, if the UI element should be hidden, false otherwise
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
