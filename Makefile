
CM = node_modules/.bin/component
UGLIFYJS = node_modules/.bin/uglifyjs
DEP = component.json $(shell find lib -type f)
JS_DEP = $(filter %.js, $(DEP))

.PHONY: build clean sass lint release

build: build/build.js sass

build/build.js: $(DEP)
	@$(CM) build --dev
	@echo 'build component done'

lint:
	@jshint $(JS_DEP)

release:
	@$(CM) build --standalone 'opengallery' -n build.raw
	$(UGLIFYJS) --mangle < build/build.raw.js > build/build.js

clean:
	rm -f build/build.js \
          build/build.raw.js
