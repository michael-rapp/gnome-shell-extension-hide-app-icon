#===================================================================================================
UUID=hide-app-icon@mrapp.sourceforge.com
EXTENSIONS_DIR=~/.local/share/gnome-shell/extensions
#===================================================================================================
default_target: compile
.PHONY: clean install uninstall

# Deletes all generated files
clean:
	rm -f $(UUID).zip
	rm -f $(UUID)/schemas/gschemas.compiled; \
	rm -rf $(UUID)/locale/*/

# Uninstalls the extension
uninstall:
	rm -rf $(EXTENSIONS_DIR)/$(UUID);

# Creates all generated files
compile: clean
	glib-compile-schemas $(UUID)/schemas; \
	for file in $(UUID)/locale/*.po; do \
		dir=$(UUID)/locale/$$(basename $${file%.*})/LC_MESSAGES; \
		mkdir -p $$dir; \
		msgfmt $$file -o $$dir/hide-app-icon.mo; \
	done
	
# Packages the extension as a zip archive as required by extensions.gnome.org
zip: compile
	(cd $(UUID) && zip -rq ../$(UUID).zip metadata.json *.js schemas/gschemas.compiled locale/*/);

# Installs the extension
install: uninstall zip
	unzip -o $(UUID).zip -d $(EXTENSIONS_DIR)/$(UUID);
