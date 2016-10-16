#=============================================================================
UUID=hide-app-icon@mrapp.sourceforge.com
FILES=metadata.json *.js
#=============================================================================
default_target: all
.PHONY: clean all zip

zip:
	(cd $(UUID); \
		zip -rq ../$(UUID).zip $(FILES))