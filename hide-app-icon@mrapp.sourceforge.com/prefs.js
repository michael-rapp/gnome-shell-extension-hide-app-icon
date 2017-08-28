const Gtk = imports.gi.Gtk;
const Lang = imports.lang;
const Gettext = imports.gettext.domain('hide-app-icon');
const _ = Gettext.gettext;
const ExtensionUtils = imports.misc.extensionUtils;
const Extension = ExtensionUtils.getCurrentExtension();
const Convenience = Extension.imports.convenience;

// Settings
const HIDE_ICON = 'hide-app-icon';
const HIDE_LABEL = 'hide-app-label';
const HIDE_ARROW = 'hide-arrow';
const PADDING = 'padding';

function init() {
    Convenience.initTranslations("hide-app-icon");
}

function SettingsWidget() {
    this._init();
}

SettingsWidget.prototype = {

    _init: function() { 
        this._grid = new Gtk.Grid();
        this._grid.margin = this._grid.row_spacing = this._grid.column_spacing = 8;
	    this._settings = Convenience.getSettings();
	    
	    // Labels
        this._grid.attach(new Gtk.Label({ label: _("Hide app icon"), wrap: true, xalign: 0.0 }), 0, 0, 1, 1);
        this._grid.attach(new Gtk.Label({ label: _("Hide app label"), wrap: true, xalign: 0.0 }), 0, 1, 1, 1);
        this._grid.attach(new Gtk.Label({ label: _("Hide arrow"), wrap: true, xalign: 0.0 }), 0, 2, 1, 1);
        this._grid.attach(new Gtk.Label({ label: _("Horizontal padding"), wrap: true, xalign: 0.0 }), 0, 3, 1, 1);
       
        // Hide app icon switch
        this._hideAppIconSwitch = new Gtk.Switch({active: this._settings.get_boolean(HIDE_ICON)});
        this._hideAppIconSwitch.set_active(this._settings.get_boolean(HIDE_ICON));
        this._grid.attach(this._hideAppIconSwitch, 1, 0, 1, 1);
        this._hideAppIconSwitch.connect('notify::active', Lang.bind(this, this._setHideAppIcon));
        
        // Hide app label switch
        this._hideAppLabelSwitch = new Gtk.Switch({active: this._settings.get_boolean(HIDE_LABEL)});
        this._hideAppLabelSwitch.set_active(this._settings.get_boolean(HIDE_LABEL));
        this._grid.attach(this._hideAppLabelSwitch, 1, 1, 1, 1);
        this._hideAppLabelSwitch.connect('notify::active', Lang.bind(this, this._setHideAppLabel));

        // Hide arrow switch
        this._hideArrowSwitch = new Gtk.Switch({active: this._settings.get_boolean(HIDE_ARROW)});
        this._hideArrowSwitch.set_active(this._settings.get_boolean(HIDE_ARROW));
        this._grid.attach(this._hideArrowSwitch, 1, 2, 1, 1);
        this._hideArrowSwitch.connect('notify::active', Lang.bind(this, this._setHideArrow));
        
        // Padding spinner
        this._paddingSpinner = Gtk.SpinButton.new_with_range(0, 64, 1);
        this._paddingSpinner.set_value(this._settings.get_int(PADDING));
        this._paddingSpinner.connect('value-changed', Lang.bind(this, this._setPadding));
        this._grid.attach(this._paddingSpinner, 1, 3, 1, 1);
    },   

    _setHideAppIcon: function(object) {
        this._settings.set_boolean(HIDE_ICON, object.active);
    },
    
    _setHideAppLabel: function(object) {
        this._settings.set_boolean(HIDE_LABEL, object.active);
    },
    
    _setHideArrow: function(object) {
        this._settings.set_boolean(HIDE_ARROW, object.active);
    },
    
    _setPadding: function() {
        this._settings.set_int(PADDING, this._paddingSpinner.get_value());
    },

    _completePrefsWidget: function() {
        let scrollingWindow = new Gtk.ScrolledWindow({
                                 'hscrollbar-policy': Gtk.PolicyType.AUTOMATIC,
                                 'vscrollbar-policy': Gtk.PolicyType.AUTOMATIC,
                                 'hexpand': true, 'vexpand': true});
        scrollingWindow.add_with_viewport(this._grid);
        scrollingWindow.show_all();
        return scrollingWindow;
    }
};

function buildPrefsWidget() {
    let widget = new SettingsWidget();
    return widget._completePrefsWidget();
}
