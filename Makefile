#=============================================================================
UUID=hide-app-icon@mrapp.sourceforge.com
SOURCES=metadata.json *.js schemas locale
EXTENSIONS_DIR=~/.local/share/gnome-shell/extensions
#=============================================================================
default_target: install
.PHONY: install uninstall zip

clean: 
	(rm -f $(UUID)/schemas/gschemas.compiled; \
		rm -rf $(UUID)/locale/*/)

# Installs the extension
install: uninstall
	cp -r $(UUID) $(EXTENSIONS_DIR);

# Uninstalls the extension
uninstall:
	rm -rf $(EXTENSIONS_DIR)/$(UUID);

# Packages the extension as a zip archive as required by extensions.gnome.org
zip:
	(cd $(UUID); \
		zip -rq ../$(UUID).zip $(SOURCES))
