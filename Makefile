.PHONY: site copy

PANDOC=pandoc --from markdown --to html --fail-if-warnings course.md --metadata title="title" --metadata-file=config.json 
SOURCES=index.html course/ cur/ glossary/ topic/
EXTRAS=img llab.js llab/css/ llab/fonts/ llab/html llab/img/ llab/lib llab/script llab/loader.js

# Copies the existing content into the www/ folder subdirectories.
copy:
	cp -r --parents ${SOURCES} ${EXTRAS} www/bjc-r/

# Processes each HTML file as a template. If any template markers are present
# in the file, they will be replaced with data from config.json. Otherwise they
# will be unchanged.
site: copy
	find ${SOURCES} -name "*.html" | xargs -I {} -n 1 ${PANDOC} --template {} -o www/bjc-r/{}
