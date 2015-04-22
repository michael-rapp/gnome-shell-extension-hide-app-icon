const GdkPixbuf = imports.gi.GdkPixbuf;
const Gdk = imports.gi.Gdk;
const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;
const GObject = imports.gi.GObject;
const Gtk = imports.gi.Gtk;
const St = imports.gi.St;
const Lang = imports.lang;
const Gettext = imports.gettext.domain('gnome-shell-extensions');
const _ = Gettext.gettext;
const ExtensionUtils = imports.misc.extensionUtils;
const Extension = ExtensionUtils.getCurrentExtension();
const Convenience = Extension.imports.convenience;
const _N = function(x) { return x; }

// Settings
const HIDE_ICON = 'hide-app-icon';
const HIDE_LABEL = 'hide-app-label';
const HIDE_ARROW = 'hide-arrow';

// Labels
const HIDE_ICON_LABEL = _N("Hide app icon");
const HIDE_LABEL_LABEL = _N("Hide app label");
const HIDE_ARROW_LABEL = _N("Hide arrow");

function init() {
    Convenience.initTranslations();
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
        this._grid.attach(new Gtk.Label({ label: _(HIDE_ICON_LABEL), wrap: true, xalign: 0.0 }), 0, 0, 1, 1);
        this._grid.attach(new Gtk.Label({ label: _(HIDE_LABEL_LABEL), wrap: true, xalign: 0.0 }), 0, 2, 3, 1);
        this._grid.attach(new Gtk.Label({ label: _(HIDE_ARROW_LABEL), wrap: true, xalign: 0.0 }), 0, 4, 3, 1);
       
        // Hide app icon switch
        this._hideAppIcon = new Gtk.Switch({active: this._settings.get_boolean(HIDE_ICON)});
        this._grid.attach(this._hideAppIcon, 4, 0, 1, 1);
        this._hideAppIcon.connect('notify::active', Lang.bind(this, this._setHideAppIcon));
        
        // Hide app label switch
        this._hideAppLabel = new Gtk.Switch({active: this._settings.get_boolean(HIDE_LABEL)});
        this._grid.attach(this._hideAppLabel, 4, 2, 1, 1);
        this._hideAppLabel.connect('notify::active', Lang.bind(this, this._setHideAppLabel));

        // Hide arrow switch
        this._hideArrow = new Gtk.Switch({active: this._settings.get_boolean(HIDE_ARROW)});
        this._grid.attach(this._hideArrow, 4, 4, 1, 1);
        this._hideArrow.connect('notify::active', Lang.bind(this, this._setHideArrow));

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